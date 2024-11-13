const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const newsTagSchema = new mongoose.Schema({
  ID: { type: String, default: uuidv4, unique: true },
  Tag_ID_FK: { type: String, required: true },
  News_ID_FK: { type: String, required: true }
});

module.exports = mongoose.model('NewsTag', newsTagSchema);