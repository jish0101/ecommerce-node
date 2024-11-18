import express from "express";
import { asyncWrapper } from "../../lib/helpers";
import checkRoles from "../../middlewares/checkRoles";
import UserController from "../../controllers/user/user.controller";
import multerInstance from "@/lib/multer";

const router = express.Router();
const userController = new UserController();

router.get("/get", checkRoles(["ADMIN"]), asyncWrapper(userController.get));
router.post("/create", asyncWrapper(userController.create));
router.put("/update", asyncWrapper(userController.update));
router.put(
  "/profile",
  multerInstance.single("profile"),
  asyncWrapper(userController.updateProfile),
);
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(userController.delete),
);

export default router;
