const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const accountSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      maxlength: 100,
      minlength: 1,
      required: true, // Bắt buộc nhập
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    LastName: {
      type: String,
      maxlength: 100,
      minlength: 1,
      required: true, // Bắt buộc nhập
      trim: true,
    },
    Username: {
      type: String,
      maxlength: 100,
      minlength: 3,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      maxlength: 250,
      minlength: 8,
      required: true,
    },
    Email: {
      type: String,
      maxlength: 250,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      trim: true,
    },
    Role: {
      type: String,
      maxlength: 50,
      enum: ["Admin", "System", "Content Writer"],
      default: "Content Writer",
    },
    Status: {
      type: Boolean,
      default: true,
    },
    Avatar: {
      type: String,
      maxlength: 250,
      default:
        process.env.DEFAULT_AVATAR || "https://example.com/default-avatar.png",
    },
    CreatedBy: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    Bio: {
      // Trường Bio mới
      type: String,
      maxlength: 500, // Giới hạn độ dài của Bio
      trim: true, // Loại bỏ khoảng trắng thừa
      default: "", // Giá trị mặc định là chuỗi rỗng
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware để mã hóa mật khẩu trước khi lưu
accountSchema.pre("save", async function (next) {
  try {
    if (this.isModified("Password")) {
      this.Password = await bcrypt.hash(this.Password, 8); // Hash mật khẩu với salt 10 vòng
    }
    next();
  } catch (err) {
    next(err); // Xử lý lỗi trong quá trình hash
  }
});

// Phương thức để kiểm tra mật khẩu
accountSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.Password); // So sánh mật khẩu được cung cấp với mật khẩu đã mã hóa
};

module.exports = mongoose.model("Account", accountSchema);
