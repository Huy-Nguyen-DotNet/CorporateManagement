const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const commentSchema = new mongoose.Schema({
  ID: { type: String, default: uuidv4, unique: true },
  News_ID_FK: { type: String, required: true },
  Account_ID_FK: { type: String, required: true },
  Content: { type: String, required: true },
  CreatedDate: { type: Date },
  Status: { type: Number, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
