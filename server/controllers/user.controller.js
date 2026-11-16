import UserModel from "../models/user.model.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from the request object
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user: Error ${error}` });
  }
};

export default getCurrentUser;
