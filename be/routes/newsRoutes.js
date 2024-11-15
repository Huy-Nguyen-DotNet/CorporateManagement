const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Category = require('../models/Category'); // Assuming you have a Category model

// Create a new news article
router.post('/', async (req, res) => {
  try {
    // Kiểm tra xem Category_ID_Fk có tồn tại trong cơ sở dữ liệu không
    const category = await Category.findById(req.body.Category_ID_Fk);
    if (!category) return res.status(400).json({ message: 'Category not found' });

    const newNews = new News(req.body);
    const news = await newNews.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a news article by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a news article
router.put('/:id', async (req, res) => {
  try {
    // Kiểm tra xem Category_ID_Fk có tồn tại trong cơ sở dữ liệu không
    const category = await Category.findById(req.body.Category_ID_Fk);
    if (!category) return res.status(400).json({ message: 'Category not found' });

    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ message: 'News not found' });
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a news article
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
