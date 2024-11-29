// routes/accountRoutes.js
const express = require("express");
const upload = require("../utils/multerConfig"); // Import multerConfig
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const authenticateToken = require("../middlewares/authenticateToken");
const { ObjectId } = require("mongoose").Types;

const JWT_SECRET = "11052003Huy@@";

// Route lấy thông tin tài khoản hiện tại
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id); // Sử dụng đúng ObjectId
    console.log("Route /profile hit");

    // Tìm tài khoản người dùng theo ID
    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Trả về thông tin tài khoản
    res.json({
      Id: account._id,
      FirstName: account.FirstName,
      LastName: account.LastName,
      Role: account.Role,
      Email: account.Email,
      Status: account.Status,
      Avatar: account.Avatar,
      Bio: account.Bio,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      CreatedBy: account.CreatedBy,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put(
  "/edit-profile",
  authenticateToken,
  upload.single("Avatar"),
  async (req, res) => {
    try {
      const userId = new ObjectId(req.user.id); // Sử dụng đúng ObjectId

      // Tìm tài khoản theo ID
      const account = await Account.findById(userId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Cập nhật thông tin người dùng
      const { FirstName, LastName, Email, Bio, Role } = req.body;

      // Kiểm tra các trường nếu có thay đổi
      if (FirstName) account.FirstName = FirstName;
      if (LastName) account.LastName = LastName;
      if (Email) account.Email = Email;
      if (Bio) account.Bio = Bio;
      if (Role) account.Role = Role;

      // Nếu có ảnh mới được tải lên, lưu đường dẫn của ảnh
      if (req.file) {
        account.Avatar = req.file.path; // Lưu đường dẫn ảnh vào cơ sở dữ liệu
      }

      // Lưu thay đổi
      await account.save();

      return res.json({ message: "Profile updated successfully", account });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.put("/change-password", authenticateToken, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id); // Sử dụng đúng ObjectId
    console.log("Route /change-password hit");

    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Kiểm tra password hiện tại
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      account.Password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    account.Password = req.body.newPassword; // Đảm bảo bạn cập nhật đúng trường `Password`
    await account.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Route tạo tài khoản mới
router.post("/", async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    const account = await newAccount.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Route lấy tất cả tài khoản
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts); // Trả về danh sách tài khoản
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm tài khoản theo username
    const account = await Account.findOne({ Username: username });
    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu

    const isPasswordValid = await bcrypt.compare(password, account.Password);
    console.log("Password to compare:", password);
    console.log("Stored password hash:", account.Password);
    console.log("Password validation:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: account._id.toString(), role: account.Role }, // Đảm bảo id là chuỗi của ObjectId
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Trả về token và thông báo thành công
    res.json({
      token,
      message: "Đăng nhập thành công",
      user: {
        Id: account._id,
        FirstName: account.FirstName,
        LastName: account.LastName,
        Role: account.Role,
        Email: account.Email,
        Status: account.Status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        CreatedBy: account.CreatedBy,
        Avatar: account.Avatar,
        Bio: account.Bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

// Route lấy tài khoản theo id
router.get("/:id", async (req, res) => {
  try {
    const accountId = req.params.id; // Lấy id từ params
    const account = await Account.findById(accountId); // Sử dụng mô hình Account

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account); // Trả về dữ liệu tài khoản
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route xóa tài khoản theo id
router.delete("/:id", async (req, res) => {
  try {
    const accountId = req.params.id; // Lấy id từ params

    // Tìm và xóa tài khoản theo id
    const account = await Account.findByIdAndDelete(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ message: "Account deleted successfully" }); // Trả về thông báo thành công
  } catch (error) {
    res.status(500).json({ message: error.message }); // Xử lý lỗi nếu có
  }
});

// Route cập nhật vai trò tài khoản (không cần token)
router.put("/update-role/:id", async (req, res) => {
  try {
    const accountId = req.params.id; // Lấy id từ params
    const { Role } = req.body; // Lấy dữ liệu Role từ body

    if (!Role) {
      return res.status(400).json({ message: "Vui lòng cung cấp vai trò mới" });
    }

    // Tìm tài khoản theo ID
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Cập nhật vai trò
    account.Role = Role;
    await account.save(); // Lưu thay đổi

    return res.json({ message: "Role updated successfully", account });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});
// Route vô hiệu hóa/mở lại tài khoản
router.put("/update-status/:id", async (req, res) => {
  try {
    const accountId = req.params.id; // Lấy id từ params
    const { Status } = req.body; // Lấy trạng thái mới từ body (true hoặc false)
    console.log("Received Status:", Status); // Log giá trị của Status
    console.log("Type of Status:", typeof Status); // Log kiểu dữ liệu của Status
    // Kiểm tra xem status có phải là boolean hoặc 1/0 không
    if (typeof Status !== "boolean" && Status !== true && Status !== false) {
      return res
        .status(400)
        .json({ message: "Trạng thái phải là kiểu Boolean" });
    }

    // Tìm tài khoản theo ID
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Cập nhật trạng thái tài khoản (true = active, false = disabled)
    account.Status = Status;
    await account.save(); // Lưu thay đổi

    return res.json({
      message: `Account ${Status ? "activated" : "disabled"} successfully`,
      account,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// Route để reset mật khẩu
router.put("/reset-password/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm tài khoản theo ID
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // Mật khẩu mới (ví dụ: 123456789)
    const newPassword = "123456789"; // Mật khẩu mới cố định

    // Cập nhật mật khẩu cho tài khoản mà không cần hash lại
    account.password = newPassword;

    // Lưu tài khoản với mật khẩu mới
    await account.save();

    res.status(200).json({ message: "Mật khẩu đã được reset thành công" });
  } catch (error) {
    console.error("Lỗi khi reset mật khẩu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi reset mật khẩu" });
  }
});

module.exports = router;
