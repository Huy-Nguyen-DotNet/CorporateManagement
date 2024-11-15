const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  News_ID_FK: { type: String, required: true },
  Account_ID_FK: { type: String, required: true },
  Content: { type: String, required: true },
  CreatedDate: { type: Date },
  Status: { type: Boolean, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);