const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
const JWT_SECRET = "11052003Huy@@";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    try {
      // Gắn userId vào req để các route khác sử dụng
      req.user = { id: new ObjectId(user.id), role: user.role };
      next(); // Chỉ gọi next nếu không có lỗi
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

module.exports = authenticateToken;
