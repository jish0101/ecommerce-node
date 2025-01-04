import express from "express";
import { asyncWrapper } from "@/lib/helpers";
import HomeController from "@/controllers/home";

const router = express.Router();
const controller = new HomeController();

router.get("/get", asyncWrapper(controller.get));

export default router;
