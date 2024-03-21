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
  loginAsAdmin,
  uploadProfilePic,
  removeProfilePic,
} from "../controllers/user.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";
import { upload } from "../utils/S3Uploader";

const router = express.Router();

router.get("/token", generateJWT); // TODO - Remove this endpoint - for testing only
router.get("/verify", verifyAuthentication, verify);
router.post("/loginAdmin", loginAsAdmin);
router.post("/student", signupAsStudent);
router.post("/organization/new/", signupAsNewOrg);
router.post("/organization/:id/", signupWithExistingOrg);
router.get("/verify/student/:token", verifyStudentSignup);
router.get("/verify/organization/new/:token", verifyNewOrgSignup);
router.get("/verify/organization/:id/:token", verifyExistingOrgSignup);
router.post("/loginUser", loginUser);
router.post("/logoutUser", verifyAuthentication, logoutUser);
router.post("/resetPassword", resetPassword); // should we be authenticated?
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/", getAllUsers);
router.get("/me", getLoggedInUser);
router.get("/:id", getUserById);
router.patch("/me", updateUser);
router.delete("/:id", removeUserById);
router.post("/profilePicture", upload.single("file"), uploadProfilePic);
router.delete("/profilePicture", removeProfilePic);

export default router;
