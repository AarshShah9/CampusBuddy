import express from "express";
import {
  manageMembershipRequest,
  createNewOrganization,
  deleteOrganization,
  getAllOrganizations,
  getAllOrganizationsByInstitution,
  getAllPendingOrgUsers,
  getAllPendingOrganizations,
  getOrganizationById,
  organizationTest,
  updateOrganization,
  manageNewOrganizationRequest,
} from "../controllers/org.controller";
import { upload } from "../utils/S3Uploader";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test", organizationTest);
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/", getAllOrganizations);
router.get("/institution/:id", getAllOrganizationsByInstitution);
router.get("/:id/pendingUsers", getAllPendingOrgUsers);
router.get("/pending", getAllPendingOrganizations); // for admin interface
router.post("/:id/orgApproval", manageNewOrganizationRequest); // for admin interface
router.post("/:id/membership/approval", manageMembershipRequest);
router.post("/", upload.single("file"), createNewOrganization);
router.get("/:id", getOrganizationById);
router.patch("/:id", upload.single("file"), updateOrganization);
router.delete("/:id", deleteOrganization);

export default router;
