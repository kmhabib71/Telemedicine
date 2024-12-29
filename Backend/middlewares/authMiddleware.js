const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // console.log("Authenticating user...");
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) {
    console.log("No token found");
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { authenticateUser };
