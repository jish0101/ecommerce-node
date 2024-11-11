import express from "express";
import { asyncWrapper } from "../../lib/helpers";
import checkAuth from "../../middlewares/checkAuth";
import checkRoles from "../../middlewares/checkRoles";
import UserController from "../../controllers/user/user.controller";

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
router.delete(
  "/delete",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.delete),
);

export default router;
