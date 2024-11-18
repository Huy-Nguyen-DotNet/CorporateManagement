const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    News_ID_FK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
    },
    Account_ID_FK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    Content: { type: String, required: true, maxlength: 1000 }, // Giới hạn 1000 ký tự
    Status: { type: Boolean, default: true }, // Mặc định là hiển thị
  },
  { timestamps: true } // Thêm createdAt và updatedAt
);

module.exports = mongoose.model("Comment", commentSchema);
