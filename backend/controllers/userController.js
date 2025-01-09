import mongoose from "mongoose";
import User from "../models/User.js";

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDiliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await User.find({ role: "delivery_personnel" });
    

    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error("Error fetching delivery personnel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // If no users are found, return a 404 error
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);

    // Handle specific errors
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid query parameters" });
    }

    // Generic server error response
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleNotify = async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the notification to the user's notifications array
    user.notifications.push({
      _id: new mongoose.Types.ObjectId(), // Explicitly generate a new ObjectId
      message,
      timestamp: new Date(),
      isRead: false, // Default to false
    });

    await user.save();

    // Respond with success
    res.status(200).json({ message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Failed to send notification" });
  }
};

export const fetchNotifications = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.notifications);
    }
    catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

export const markNotificationAsSeen = async (req, res) => {
  const { userId, notificationId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the notification by ID using Mongoose's .id() method
    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Mark the notification as seen
    notification.isRead = true;

    // Save the updated user document
    await user.save();

    // Respond with success
    res
      .status(200)
      .json({ message: "Notification marked as seen successfully!" });
  } catch (error) {
    console.error("Error marking notification as seen:", error);
    res.status(500).json({ message: "Failed to mark notification as seen" });
  }
};