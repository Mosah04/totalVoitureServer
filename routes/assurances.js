import express from "express";
import {
  createAssurance,
  getAssurances,
  getAssuranceById,
  getAssuranceOfferOrRequest,
  updateAssurance,
  deleteAssurance,
  getAssuranceDemandes,
  createAssuranceOffer,
} from "../controllers/AssuranceController.js";
import middleware, { manageInfosClientFiles } from "../middleware/index.js";
import { createInfosClient } from "../controllers/InfosClientController.js";

const router = express.Router();

router.get("/police", getAssurances);
router.get("/police/:id", getAssuranceById);
router.post("/police/", createAssurance);
// router.patch("police/:id", updateAssurance);
// router.delete("police/:id", deleteAssurance);

router.get("/user/:idUser", getAssuranceOfferOrRequest);
// router.get("police/:id", getAssuranceById);
// router.post("police/", createAssurance);
// router.patch("police/:id", updateAssurance);
// router.delete("police/:id", deleteAssurance);

router.post(
  "/infos-client",
  middleware.decodeToken,
  ...manageInfosClientFiles(),
  createInfosClient
);

router.post("/create-offer", middleware.decodeToken, createAssuranceOffer);

router.get("/request", getAssuranceDemandes);

export default router;
