const express = require('express');
const router = express.Router();
const NewsTag = require('../models/NewsTag');

// Create a new NewsTag
router.post('/', async (req, res) => {
  try {
    const { Tag_ID_FK, News_ID_FK } = req.body;
    
    // Kiểm tra xem Tag_ID_FK và News_ID_FK có tồn tại trong cơ sở dữ liệu không
    const existingNewsTag = await NewsTag.findOne({ Tag_ID_FK, News_ID_FK });
    if (existingNewsTag) {
      return res.status(400).json({ message: 'NewsTag with this Tag_ID_FK and News_ID_FK already exists.' });
    }

    const newNewsTag = new NewsTag(req.body);
    const newsTag = await newNewsTag.save();
    res.status(201).json(newsTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all NewsTags
router.get('/', async (req, res) => {
  try {
    const newsTags = await NewsTag.find();
    res.json(newsTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a NewsTag by ID (or by both Tag_ID_FK and News_ID_FK)
router.get('/:tagId/:newsId', async (req, res) => {
  try {
    const { tagId, newsId } = req.params;
    const newsTag = await NewsTag.findOne({ Tag_ID_FK: tagId, News_ID_FK: newsId });
    if (!newsTag) return res.status(404).json({ message: 'NewsTag not found' });
    res.json(newsTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a NewsTag by Tag_ID_FK and News_ID_FK
router.put('/:tagId/:newsId', async (req, res) => {
  try {
    const { tagId, newsId } = req.params;
    
    // Kiểm tra xem Tag_ID_FK và News_ID_FK có tồn tại không
    const newsTag = await NewsTag.findOne({ Tag_ID_FK: tagId, News_ID_FK: newsId });
    if (!newsTag) return res.status(404).json({ message: 'NewsTag not found' });

    // Cập nhật thông tin
    const updatedNewsTag = await NewsTag.findOneAndUpdate({ Tag_ID_FK: tagId, News_ID_FK: newsId }, req.body, { new: true });
    res.json(updatedNewsTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a NewsTag by Tag_ID_FK and News_ID_FK
router.delete('/:tagId/:newsId', async (req, res) => {
  try {
    const { tagId, newsId } = req.params;
    
    // Kiểm tra xem Tag_ID_FK và News_ID_FK có tồn tại không
    const newsTag = await NewsTag.findOne({ Tag_ID_FK: tagId, News_ID_FK: newsId });
    if (!newsTag) return res.status(404).json({ message: 'NewsTag not found' });

    // Xóa bản ghi
    await NewsTag.findOneAndDelete({ Tag_ID_FK: tagId, News_ID_FK: newsId });
    res.json({ message: 'NewsTag deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
