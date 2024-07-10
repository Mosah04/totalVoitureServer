import express from "express";
import {
  createDevis,
  getDevis,
  getDevisById,
  getDevisByUserId,
  getDevisByDemandeId,
  updateDevis,
  deleteDevis,
  validateDevis,
  chooseDevis,
} from "../controllers/DevisController.js";
import middleware from "../middleware/index.js";

const router = express.Router();

/* GET users listing. */
router.get("/", getDevis);
router.get("/:id", getDevisById);
router.get("/user/:idUser", getDevisByUserId);
router.get("/demande/:idDemande", getDevisByDemandeId);

router.post("/", middleware.decodeToken, createDevis);
router.put("/:id/validate", middleware.decodeToken, validateDevis);
router.put("/:id/choose", middleware.decodeToken, chooseDevis);
router.patch("/:id", middleware.decodeToken, updateDevis);
router.delete("/:id", middleware.decodeToken, deleteDevis);

export default router;
