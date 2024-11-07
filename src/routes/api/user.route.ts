import express from "express";
import UserController from "../../controllers/user/user.controller";

const router = express.Router();
const userController = new UserController();

router.get("/get", userController.get);

export default router;
