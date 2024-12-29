const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const createUser = async (userData) => {
  console.log(userData);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const validatePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

const updateUserProfile = async (userId, profileData) => {
  return await User.findByIdAndUpdate(userId, profileData, { new: true });
};

module.exports = {
  createUser,
  findUserByEmail,
  validatePassword,
  updateUserProfile,
};
