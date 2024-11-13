const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
  ID: { type: String, default: uuidv4, unique: true },
  Name: { type: String, maxlength: 250 },
  Url: { type: String, maxlength: 100 },
  Summary: { type: String, maxlength: 250 },
  Position: { type: Number },
  Account_ID_FK: { type: String },
  ParentCat_ID_FK: { type: String },
  MetaTitle: { type: String, maxlength: 250 },
  MetaKeyword: { type: String, maxlength: 250 },
  MetaDescription: { type: String, maxlength: 250 },
  CreateBy: { type: String, maxlength: 50 },
  CreateDate: { type: Date },
  ModifyBy: { type: String, maxlength: 50 },
  ModifyDate: { type: Date },
  Status: { type: Number, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
