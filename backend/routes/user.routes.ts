import express from "express";
import {
  createNewUser,
  getAllUsers,
  loginUser,
  logoutUser,
  removeUserByID,
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
router.post("/loginStudent", loginUser);
router.post("/logoutStudent", verifyAuthentication, logoutUser);
router.post("/resetPassword", resetPassword);
router.delete("/removeUserByID", removeUserByID);
router.get("/getAllStudents", getAllUsers);
router.patch("/updateUser/:id", verifyAuthentication, updateUser);

export default router;
