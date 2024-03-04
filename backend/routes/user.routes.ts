import express from "express";
import {
  signupAsStudent,
  signupWithExistingOrg,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  removeUserById,
  resetPassword,
  updateUser,
  verifyExistingOrgSignup,
  verifyStudentSignup,
  verifyNewOrgSignup,
  signupAsNewOrg,
  getLoggedInUser,
  generateJWT,
  verify,
} from "../controllers/user.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/token", generateJWT); // TODO - Remove this endpoint - for testing only
router.get("/verify", verifyAuthentication, verify);
router.post("/student", signupAsStudent);
router.post("/organization/new/", signupAsNewOrg);
router.post("/organization/:id/", signupWithExistingOrg);
router.get("/verify/student/:token", verifyStudentSignup);
router.get("/verify/organization/new/:token", verifyNewOrgSignup);
router.get("/verify/organization/:id/:token", verifyExistingOrgSignup);
router.post("/loginUser", loginUser);
router.post("/logoutUser", verifyAuthentication, logoutUser);
router.post("/resetPassword", resetPassword); // should we be authenticated?
router.get("/", verifyAuthentication, getAllUsers);
router.get("/me", verifyAuthentication, getLoggedInUser);
router.get("/:id", verifyAuthentication, getUserById);
router.patch("/me", verifyAuthentication, updateUser);
router.delete("/:id", verifyAuthentication, removeUserById);

export default router;
