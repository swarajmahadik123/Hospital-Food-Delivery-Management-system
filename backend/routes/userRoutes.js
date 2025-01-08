import express from "express";
import {
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();



// Get a single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUser);


export default router;
