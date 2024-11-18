const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    Name: { type: String, maxlength: 255, required: true },
    Url: { type: String, maxlength: 255, unique: true, required: true }, // Chỉ mục duy nhất
    MetaTitle: { type: String, maxlength: 250 },
    MetaKeyword: { type: String, maxlength: 250 },
    MetaDescription: { type: String, maxlength: 250 },
    CreatedBy: { type: String, maxlength: 100 },
    ModifiedBy: { type: String, maxlength: 100 },
    Status: { type: Boolean, required: true },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("Tag", tagSchema);
