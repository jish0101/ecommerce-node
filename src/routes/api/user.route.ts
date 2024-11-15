import express from "express";
import { asyncWrapper } from "../../lib/helpers";
import checkRoles from "../../middlewares/checkRoles";
import UserController from "../../controllers/user/user.controller";
import multerInstance from "@/lib/multer";

const router = express.Router();
const userController = new UserController();

router.get("/get", checkRoles(["ADMIN"]), asyncWrapper(userController.get));
router.post(
  "/create",
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.create),
);
router.put(
  "/update",
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.update),
);
router.put(
  "/profile",
  checkRoles(["ADMIN"]),
  multerInstance.single("profile"),
  asyncWrapper(userController.updateProfile),
);
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.delete),
);

export default router;
