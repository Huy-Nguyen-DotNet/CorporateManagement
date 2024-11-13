const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
  CatID: { type: String, default: uuidv4, unique: true },
  Name: { type: String, maxlength: 250 },
  Url: { type: String, maxlength: 100 },
  Summary: { type: String, maxlength: 250 },
  Position: { type: Number },
  Account_ID_FK: { type: String },
  ParentCat_ID_FK: { type: String },
  MetaTitle: { type: String, maxlength: 250 },
  MetaKeyword: { type: String, maxlength: 250 },
  MetaDescription: { type: String, maxlength: 250 },
  CreatedBy: { type: String, maxlength: 50 },
  CreatedDate: { type: Date },
  ModifiedBy: { type: String, maxlength: 50 },
  ModifiedDate: { type: Date },
  Status: { type: Number, required: true }
});

module.exports = mongoose.model('Category', categorySchema);