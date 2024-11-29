const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    Title: { type: String, maxlength: 250, required: true },
    Content: {
      type: Object, // Thay đổi từ String thành Object để lưu dưới dạng JSON
      required: true,
      validate: {
        validator: function (value) {
          // Kiểm tra nếu Content là một Object hợp lệ
          return Array.isArray(value.sections); // sections phải là mảng
        },
        message: "Content phải chứa một mảng sections hợp lệ",
      },
    },
    Images: [
      {
        type: String, // URL của ảnh
        maxlength: 250,
      },
    ],
    Category_ID_Fk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    MetaTitle: { type: String, maxlength: 250 },
    MetaKeyword: { type: String, maxlength: 250 },
    MetaDescription: { type: String, maxlength: 500 },
    CreatedBy: { type: String, maxlength: 50 },
    ViewCount: { type: Number, default: 0 }, // Mặc định là 0 lượt xem
    Status: { type: Boolean, required: true },
    IsFeatured: { type: Boolean, default: false }, // Bài viết nổi bật
    IsTrending: { type: Boolean, default: false }, // Bài viết đang hot
    IsHero: {
      type: Boolean,
      default: false, // Mặc định là false, có thể cập nhật sau
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("News", newsSchema);
