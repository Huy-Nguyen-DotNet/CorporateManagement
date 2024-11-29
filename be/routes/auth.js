const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Account = require("../models/Account");

const router = express.Router();

// Secret key của bạn cho việc mã hóa JWT
const JWT_SECRET = "11052003Huy@@";
const JWT_EXPIRATION = "1d"; // Thời gian hết hạn của token
const REFRESH_TOKEN_SECRET = "11052003Huy@@"; // Secret cho refresh token

// Route làm mới token
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.log("No refresh token provided.");
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Kiểm tra tính hợp lệ của refresh token
    console.log("Verifying refresh token...");
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log("Token decoded successfully:", decoded);

    // Chuyển đổi accountId từ chuỗi sang ObjectId
    const accountId = new mongoose.Types.ObjectId(decoded.id);

    console.log("Account ID after conversion:", accountId);

    // Lấy thông tin tài khoản từ ObjectId (lưu trong refresh token)
    const account = await Account.findById(accountId); // Tìm theo ObjectId
    console.log("Account found:", account);

    if (!account) {
      console.log("Account not found.");
      return res.status(403).json({ message: "Account not found" });
    }

    // Tạo lại access token mới
    const newAccessToken = jwt.sign({ accountId: account._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    console.log("New access token generated:", newAccessToken);

    // Trả về access token mới
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Error refreshing token" });
  }
});

module.exports = router;
