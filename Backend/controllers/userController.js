const multer = require("multer");
const path = require("path");
const userService = require("../services/userService");
const userModel = require("../models/userModel");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Save files in the `uploads` folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// Update User Profile function
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = { ...req.body };

    // If `dateOfBirth` is provided as "null" (string), set it to null
    if (updateData.dateOfBirth === "null") {
      updateData.dateOfBirth = null;
    }

    // If a file is uploaded, add the image URL to updateData
    if (req.file) {
      const imagePath = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      updateData.profilePicture = imagePath;
    }
    if (updateData.height) {
      try {
        updateData.height = JSON.parse(updateData.height); // Parse back to object
      } catch (error) {
        console.error("Error parsing height:", error.message);
      }
    }
    console.log("Update data:", updateData);

    const updatedUser = await userService.updateUserProfile(userId, updateData);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Middleware to handle file uploads
const uploadMiddleware = upload.single("profilePicture");

const registerUser = async (req, res) => {
  try {
    const { role, email, password, name, phone } = req.body;
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userService.createUser({
      role,
      email,
      password,
      name,
      phone,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (
      !user ||
      !(await userService.validatePassword(password, user.password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // `req.user` is populated by the authentication middleware
    const user = await userModel.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Populate missing fields with defaults
    const profile = {
      ...user.toObject(),
      phone: user.phone || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth || null,
      address: user.address || "",
      profession: user.profession || "",
      height: user.height || { feet: null, inch: null },
      weight: user.weight || null,
      bloodGroup: user.bloodGroup || "",
    };

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  uploadMiddleware,
};
