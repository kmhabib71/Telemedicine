const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  uploadMiddleware,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes for user profile management
router.get("/profile", authenticateUser, getUserProfile);
router.put("/profile", authenticateUser, uploadMiddleware, updateUserProfile);

module.exports = router;
