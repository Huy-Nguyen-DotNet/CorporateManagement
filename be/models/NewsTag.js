const mongoose = require("mongoose");

const newsTagSchema = new mongoose.Schema(
  {
    Tag_ID_FK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    News_ID_FK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Tạo chỉ mục kết hợp để đảm bảo một cặp Tag và News không bị trùng
newsTagSchema.index({ Tag_ID_FK: 1, News_ID_FK: 1 }, { unique: true });

module.exports = mongoose.model("NewsTag", newsTagSchema);
