import express from "express";
import {
  createNewUser,
  getAllUsers,
  loginUser,
  logoutUser,
  removeUserById,
  resetPassword,
  updateUser,
  verifyAccount,
} from "../controllers/user.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.post("/createNewUser", createNewUser);
router.post("/verifyOTP/:token", verifyAccount);
router.post("/loginUser", loginUser);
router.post("/logoutUser", verifyAuthentication, logoutUser);
router.post("/resetPassword", resetPassword);
router.delete("/removeUser/:id", removeUserById);
router.get("/getAllUsers", getAllUsers);
router.patch("/updateUser/:id", verifyAuthentication, updateUser);

export default router;
