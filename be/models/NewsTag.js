const mongoose = require('mongoose');

const newsTagSchema = new mongoose.Schema({
  Tag_ID_FK: { type: String, required: true },
  News_ID_FK: { type: String, required: true }
});

module.exports = mongoose.model('NewsTag', newsTagSchema);