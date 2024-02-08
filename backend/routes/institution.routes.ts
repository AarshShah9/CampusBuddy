import express from "express";
import {
  createInstitution,
  getInstitutionByID,
  getInstitutionByName,
  removeInstitutionByID,
  getAllInstitutions,
} from "../controllers/institution.controller";

const router = express.Router();

router.post("/createInstitution", createInstitution);
router.get("/getInstitutionByID", getInstitutionByID);
router.get("/getInstitutionByName", getInstitutionByName);
router.delete("/removeInstitutionByID", removeInstitutionByID);
router.get("/getAllInstitutions", getAllInstitutions);

export default router;
