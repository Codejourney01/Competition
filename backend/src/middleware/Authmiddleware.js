const User = require("../models/User");

// ==========================================
// PROTECT ROUTES
// ==========================================
const protect = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(
      req.session.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

module.exports = {
  protect,
};