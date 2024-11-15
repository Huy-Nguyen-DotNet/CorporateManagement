const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const News = require('../models/News');  // Assuming there is a News model
const Account = require('../models/Account');  // Assuming there is an Account model

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { News_ID_FK, Account_ID_FK, Content } = req.body;

    // Check if News_ID_FK exists
    const news = await News.findById(News_ID_FK);
    if (!news) return res.status(404).json({ message: 'News not found' });

    // Check if Account_ID_FK exists
    const account = await Account.findById(Account_ID_FK);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const newComment = new Comment({
      News_ID_FK,
      Account_ID_FK,
      Content,
      CreatedDate: new Date(),
      Status: 1 // Default status
    });

    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments by News_ID_FK
router.get('/:newsId', async (req, res) => {
  try {
    const comments = await Comment.find({ News_ID_FK: req.params.newsId });
    if (!comments) return res.status(404).json({ message: 'No comments found' });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const { News_ID_FK, Account_ID_FK, Content } = req.body;

    // Check if the News_ID_FK exists
    const news = await News.findById(News_ID_FK);
    if (!news) return res.status(404).json({ message: 'News not found' });

    // Check if the Account_ID_FK exists
    const account = await Account.findById(Account_ID_FK);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { News_ID_FK, Account_ID_FK, Content, CreatedDate: new Date() },
      { new: true }
    );

    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check if News_ID_FK exists
    const news = await News.findById(comment.News_ID_FK);
    if (!news) return res.status(404).json({ message: 'News not found' });

    // Check if Account_ID_FK exists
    const account = await Account.findById(comment.Account_ID_FK);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
