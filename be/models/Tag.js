const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tagSchema = new mongoose.Schema({
  TagID: { type: String, default: uuidv4, unique: true },
  Name: { type: String, maxlength: 255 },
  Url: { type: String, maxlength: 255 },
  MetaTitle: { type: String, maxlength: 250 },
  MetaKeyword: { type: String, maxlength: 250 },
  MetaDescription: { type: String, maxlength: 250 },
  CreatedBy: { type: String, maxlength: 250 },
  CreatedDate: { type: Date },
  ModifiedBy: { type: String, maxlength: 250 },
  ModifiedDate: { type: Date },
  Status: { type: Number, required: true }
});

module.exports = mongoose.model('Tag', tagSchema);