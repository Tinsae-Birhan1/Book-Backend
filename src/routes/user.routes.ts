import * as express from "express";
import { UserController } from "../controllers/user.controllers";
import { authentication } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import {AuthController} from "../controllers/auth.controller"
const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get(
  "/users",
  authentication,
  authorization(["admin"]),
  UserController.getUsers
);
router.get(
  "/profile",
  authentication,
  authorization(["user", "admin"]),
  AuthController.getProfile
);
// router.post("/signup", UserController.signup);
// router.post("/login", AuthController.login);
router.put(
  "/update/:id",
  authentication,
  authorization(["user", "admin"]),
  UserController.updateUser
);
router.delete(
  "/delete/:id",
  // authentication,
  // authorization(["admin"]),
  UserController.deleteUser
);
export { router as userRouter };
