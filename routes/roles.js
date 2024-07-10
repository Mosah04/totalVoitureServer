import express from "express";
import { createRole, getRoles } from "../controllers/RoleController.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);

export default router;
