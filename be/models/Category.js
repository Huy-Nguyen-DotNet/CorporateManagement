const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    Name: { type: String, maxlength: 250, required: true },
    Url: { type: String, maxlength: 100, unique: true, required: true },
    Summary: { type: String, maxlength: 250 },
    Position: { type: Number },
    ParentCat_ID_FK: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    MetaTitle: { type: String, maxlength: 250 },
    MetaKeyword: { type: String, maxlength: 250 },
    MetaDescription: { type: String, maxlength: 250 },
    CreatedBy: { type: String, maxlength: 50, required: true },
    ModifiedBy: { type: String, maxlength: 50 },
    Status: { type: Boolean, required: true },
  },
  { timestamps: true } // Kích hoạt timestamps
);

module.exports = mongoose.model("Category", categorySchema);
