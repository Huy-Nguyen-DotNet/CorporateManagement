const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    Title: { type: String, maxlength: 250, required: true },
    Url: { type: String, maxlength: 50, required: true, unique: true }, // URL duy nhất
    Summary: { type: String, maxlength: 500 },
    Content: { type: String, required: true }, // Nội dung bắt buộc
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
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("News", newsSchema);
