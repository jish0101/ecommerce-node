import CartController from "@/controllers/cart/cart.controller";
import { asyncWrapper } from "@/lib/helpers";
import express from "express"

const router = express.Router();
const controller = new CartController();

router.get('/get', asyncWrapper(controller.get))
router.put('/update', asyncWrapper(controller.update))
router.delete('/delete', asyncWrapper(controller.delete))

export default router;