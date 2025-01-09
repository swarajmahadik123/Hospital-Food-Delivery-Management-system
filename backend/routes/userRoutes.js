import express from "express";
import {
  getUserById,
  updateUser,
  getAllUsers,
  handleNotify,
  markNotificationAsSeen,
  fetchNotifications,
} from "../controllers/userController.js";

const router = express.Router();

// Define the "/all" route before the "/:id" route
router.get("/all", getAllUsers);
router.post("/notify", handleNotify);
router.get("/notifications/:id", fetchNotifications);
router.put("/notifications/read", markNotificationAsSeen);

// Define the "/:id" route after the "/all" route
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
