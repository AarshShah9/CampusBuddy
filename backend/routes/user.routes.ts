import express from "express";
import {
  createNewUser,
  getAllUsers,
  loginUser,
  logoutUser,
  removeUserById,
  resendOTP,
  resetPassword,
  updateUser,
  verifyOTP,
} from "../controllers/user.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.post("/createNewUser", createNewUser);
router.post("/resendOTP", resendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/loginUser", loginUser);
router.post("/logoutUser", verifyAuthentication, logoutUser);
router.post("/resetPassword", resetPassword);
router.delete("/removeUser/:id", removeUserById);
router.get("/getAllUsers", getAllUsers);
router.patch("/updateUser/:id", verifyAuthentication, updateUser);

export default router;
