const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  Username: { type: String, maxlength: 100, required: true },
  Password: { type: String, maxlength: 250, required: true },
  Email: { type: String, maxlength: 250 },
  Role: { type: String, maxlength: 50 },
  CreatedDate: { type: Date, default: Date.now },
  Status: { type: Boolean, required: true }, 
  Avatar: { type: String, maxlength: 250 },
  CreatedBy: { type: String, maxlength: 100 }
});

module.exports = mongoose.model('Account', accountSchema);
