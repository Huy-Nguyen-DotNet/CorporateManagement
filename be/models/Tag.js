const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
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