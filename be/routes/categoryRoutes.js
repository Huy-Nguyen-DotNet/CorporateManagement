// routes/categories.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Account = require("../models/Account");
const authenticateToken = require("../middlewares/authenticateToken"); // Import middleware xác thực token

// Helper function to check if Account exists
const checkAccountExists = async (accountId) => {
  return await Account.findById(accountId);
};

router.post("/", authenticateToken, async (req, res) => {
  try {
    // Tạo danh mục mới, sử dụng _id của người dùng từ token
    const newCategory = new Category({
      ...req.body,
      CreatedBy: req.user.id, // Gán _id của người dùng vào trường CreatedBy
    });

    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error.message); // Log lỗi nếu có
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

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    // Lấy thông tin category cũ để đảm bảo chỉ cập nhật khi có sự thay đổi cần thiết
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Cập nhật danh mục (loại bỏ CreatedBy nếu không cần thiết cập nhật)
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        // Nếu không muốn cho phép cập nhật CreatedBy thì có thể loại bỏ từ req.body
        // hoặc giữ nguyên nếu bạn muốn cho phép thay đổi
      },
      { new: true } // Trả về đối tượng mới sau khi cập nhật
    );

    // Trả về danh mục đã cập nhật
    res.json(updatedCategory);
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

    // Xóa danh mục
    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
