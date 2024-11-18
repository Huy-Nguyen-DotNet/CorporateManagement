const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const accountSchema = new mongoose.Schema(
  {
    Username: { type: String, maxlength: 100, required: true, unique: true },
    Password: { type: String, maxlength: 250, required: true },
    Email: {
      type: String,
      maxlength: 250,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    Role: { type: String, maxlength: 50, default: "User" },
    Status: { type: Boolean, default: true }, // Tài khoản mặc định được kích hoạt
    Avatar: {
      type: String,
      maxlength: 250,
      default: "https://example.com/default-avatar.png",
    },
    CreatedBy: { type: String, maxlength: 100 },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware để mã hóa mật khẩu trước khi lưu
accountSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10); // Hash mật khẩu với salt 10 vòng
  }
  next();
});

// Phương thức để kiểm tra mật khẩu
accountSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.Password); // So sánh mật khẩu được cung cấp với mật khẩu đã mã hóa
};

module.exports = mongoose.model("Account", accountSchema);
