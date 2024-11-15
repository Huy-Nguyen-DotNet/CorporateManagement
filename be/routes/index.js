// routes/index.js
const express = require('express');
const accountRoutes = require('./accountRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const newsRoutes = require('./newsRoutes')
const TagRoutes = require('./tagRoutes')
const newNewsTagRoutes = require('./newsTagRoutes')

const router = express.Router();

router.use('/accounts', accountRoutes);
router.use('/categories', categoryRoutes);
router.use('./comments', commentRoutes);
router.use('./news', newsRoutes)
router.use('./tags', TagRoutes);
router.use('./newsTags', newNewsTagRoutes);

module.exports = router;
