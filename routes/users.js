import express from "express";
import {
    createUser, getUsers, getUserById, updateUser, deleteUser
} from '../controllers/UserController.js'

const router = express.Router()

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;