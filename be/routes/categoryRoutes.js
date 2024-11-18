// routes/categories.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Account = require("../models/Account");

// Helper function to check if Account exists
const checkAccountExists = async (accountId) => {
  return await Account.findById(accountId);
};

// Create a new category
router.post("/", async (req, res) => {
  try {
    // Kiểm tra tài khoản dựa trên _id của Account
    const account = await checkAccountExists(req.body.CreatedBy);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account not found. Category cannot be created." });
    }

    // Tạo danh mục mới, sử dụng _id của Account làm CreatedBy
    const newCategory = new Category({
      ...req.body,
      CreatedBy: account._id, // Gán _id của Account vào trường CreatedBy
    });

    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Kiểm tra tài khoản liên kết với danh mục
    const account = await checkAccountExists(category.CreatedBy);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account associated with this category not found." });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    // Kiểm tra tài khoản dựa trên _id của Account
    const account = await checkAccountExists(req.body.CreatedBy);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account not found. Category cannot be updated." });
    }

    // Cập nhật danh mục
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Kiểm tra tài khoản liên kết với danh mục
    const account = await checkAccountExists(category.CreatedBy);
    if (!account) {
      return res
        .status(404)
        .json({
          message:
            "Account associated with this category not found. Category cannot be deleted.",
        });
    }

    // Xóa danh mục
    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
