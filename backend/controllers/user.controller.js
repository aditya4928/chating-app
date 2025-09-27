import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; //from protected routes the current logged-in user

    const filteredUsers = await User.find({
      //find all users with _id but not the one with is already logged in
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers); //returning from database the schema defined in filteredusers function
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
