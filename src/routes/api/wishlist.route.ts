import express from "express";
import { asyncWrapper } from "../../lib/helpers";
import Controller from "../../controllers/wishlist";

const router = express.Router();
const controller = new Controller();

router.get("/get", asyncWrapper(controller.get));
router.put("/update", asyncWrapper(controller.update));

export default router;
