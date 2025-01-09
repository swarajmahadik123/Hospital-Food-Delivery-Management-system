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
    console.log(deliveryPersonnel);

    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    console.error("Error fetching delivery personnel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
