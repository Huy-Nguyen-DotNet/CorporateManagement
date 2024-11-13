const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const accountSchema = new mongoose.Schema({
  ID: { type: String, default: uuidv4, unique: true },
  Username: { type: String, maxlength: 100, required: true },
  Password: { type: String, maxlength: 250, required: true },
  Email: { type: String, maxlength: 250 },
  Role: { type: String, maxlength: 50 },
  CreatedDate: { type: Date },
  Status: { type: Number, required: true },
  Avatar: { type: String, maxlength: 250 },
  CreatedBy: { type: String, maxlength: 100 }
});

module.exports = mongoose.model('Account', accountSchema);