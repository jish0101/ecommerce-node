import express from "express";
import AddressController from "@/controllers/address/address.controller";

const router = express.Router();
const addressController = new AddressController();

router.post("/create", addressController.create);
router.put("/update", addressController.update);
router.put("/delete", addressController.delete);
router.put("/get", addressController.get);

export default router;
