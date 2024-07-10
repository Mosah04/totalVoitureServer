import express from "express";
import {
  createReclamation,
  getReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
} from "../controllers/ReclamationController.js";

const router = express.Router();

router.get("/", getReclamations);
router.get("/:id", getReclamationById);
router.post("/", createReclamation);
router.patch("/:id", updateReclamation);
router.delete("/:id", deleteReclamation);

export default router;
