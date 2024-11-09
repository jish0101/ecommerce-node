import express from "express";
import UserController from "../../controllers/user/user.controller";
import { asyncWrapper } from "../../lib/helpers";
import checkAuth from "../../middlewares/checkAuth";
import checkRoles from "../../middlewares/checkRoles";

const router = express.Router();
const userController = new UserController();

router.get(
  "/get",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.get),
);
router.post(
  "/create",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.create),
);
router.put(
  "/update",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.update),
);
router.put(
  "/delete",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.delete),
);

export default router;
