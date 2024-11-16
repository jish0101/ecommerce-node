import { Request, Response } from "express";
import { CustomError } from "@/lib/customError";
import { Order } from "@/models/order/order.model";
import { createResponse } from "@/lib/responseHelpers";
import {
  createOrderSchema,
  deletedOrderSchema,
  updateOrderSchema,
} from "./validationSchema";
import { Address } from "@/models/address/address.model";
import { Product } from "@/models/product/product.model";
import { PayloadUserWithID } from "@/models/user/user.model";

class OrderController {
  async create(req: Request, res: Response) {
    const { productData } = createOrderSchema.parse(req.body);
    const payloadUser = req.user as PayloadUserWithID;

    const [addressDoc, products] = await Promise.all([
      Address.findOne({
        $and: [{ user: payloadUser._id }, { isPrimary: true }],
      }),
      Product.find({
        _id: { $in: productData.map((p) => p.productId) },
      }).lean(),
    ]);

    if (!products || products.length < 1) {
      throw new CustomError("Products not found", 404);
    }

    if (!addressDoc) {
      throw new CustomError("Address not found", 404);
    }

    const excludedProducts: any[] = [];
    const productIdWithNewStocks: { _id: string; stock: number }[] = [];

    const totalOrderCost = products.reduce((prev, product) => {
      const currentProd = productData.find(
        (prod) => prod.productId === product._id.toString(),
      );

      // incase: stock is insufficient or product not found
      if (!currentProd || product.stock < currentProd.quantity) {
        excludedProducts.push(product);
        return 0;
      }

      productIdWithNewStocks.push({
        _id: currentProd.productId,
        stock: product.stock - currentProd.quantity,
      });

      return prev + product.price * currentProd.quantity;
    }, 0);

    if (productIdWithNewStocks.length > 0) {
      // Updated stocks for ordered products
      const bulkOperations = productIdWithNewStocks.map((product) => ({
        updateOne: {
          filter: { _id: product._id },
          update: { stock: product.stock },
        },
      }));

      await Product.bulkWrite(bulkOperations);
    }

    const { street, city, state, country, pinCode } = addressDoc;

    const createdOrder = await Order.create({
      address: `${street}, ${city}, ${state}, ${country}, ${pinCode}`,
      orderItems: productData,
      customer: payloadUser._id,
      orderPrice: totalOrderCost,
    });

    return res.json(
      createResponse(200, createdOrder, "Successfully created an order", {
        excludedProducts: excludedProducts,
        reason: "Product(s) not found/insufficient stock(s)",
      }),
    );
  }
  async get(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
    const orders = await Order.find({ customer: user._id });

    return res.json(createResponse(200, orders, "Successfully fetched orders"));
  }
  async update(req: Request, res: Response) {
    const { status, orderId } = updateOrderSchema.parse(req.body);

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      {
        new: true,
      },
    ).lean();

    return res.json(
      createResponse(200, updatedOrder, "Successfully updated the order"),
    );
  }
  async delete(req: Request, res: Response) {
    const { orderId } = deletedOrderSchema.parse(req.query);

    const deletedOrder = await Order.findByIdAndDelete(orderId).lean();

    return res.json(
      createResponse(200, deletedOrder, "Successfully deleted an order"),
    );
  }
}

export default OrderController;
