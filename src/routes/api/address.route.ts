import express from "express";
import { asyncWrapper } from "@/lib/helpers";
import AddressController from "@/controllers/address/address.controller";

const router = express.Router();
const addressController = new AddressController();

router.get("/get", asyncWrapper(addressController.get));
router.put("/update", asyncWrapper(addressController.update));
router.post("/create", asyncWrapper(addressController.create));
router.delete("/delete", asyncWrapper(addressController.delete));

export default router;
