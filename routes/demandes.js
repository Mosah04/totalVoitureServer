import express from "express";
import {
  createDemande,
  getDemandes,
  getDemandeById,
  getDemandeByUserId,
  updateDemande,
  deleteDemande,
} from "../controllers/DemandeController.js";
import middleware from "../middleware/index.js";

const router = express.Router();

router.get("/", getDemandes);
router.get("/:id", getDemandeById);
router.get("/user/:idUser", getDemandeByUserId);
router.post("/", middleware.decodeToken, createDemande);
router.patch("/:id", middleware.decodeToken, updateDemande);
router.delete("/:id", middleware.decodeToken, deleteDemande);

export default router;
