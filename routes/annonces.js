import express from "express";
import {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
  getAnnoncesByUserId,
  validateAnnonce,
} from "../controllers/AnnonceController.js";
import middleware, {
  manageAnnonceFiles,
  manageAnnonceFilesUpdate,
} from "../middleware/index.js";

const router = express.Router();

router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);
router.get("/user/:idUser", getAnnoncesByUserId);
router.post(
  "/",
  middleware.decodeToken,
  manageAnnonceFiles()[0],
  manageAnnonceFiles()[1],
  createAnnonce
);
router.patch(
  "/:id",
  middleware.decodeToken,
  manageAnnonceFilesUpdate()[0],
  manageAnnonceFilesUpdate()[1],
  updateAnnonce
);
router.put("/:id/validate", middleware.decodeToken, validateAnnonce);
router.delete("/:id", middleware.decodeToken, deleteAnnonce);

export default router;
