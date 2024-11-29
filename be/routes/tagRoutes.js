const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
const Account = require("../models/Account");
const authenticateToken = require("../middlewares/authenticateToken"); // Import middleware xác thực token

const checkAccountExists = async (accountId) => {
  return await Account.findById(accountId);
};
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newTag = new Tag({
      ...req.body,
      CreatedBy: req.user.id, // Gán _id của người dùng vào trường CreatedBy
    });

    const tag = await newTag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error creating tag:", error.message); // Log lỗi nếu có
    res.status(400).json({ message: error.message });
  }
});

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    // Lấy thông tin category cũ để đảm bảo chỉ cập nhật khi có sự thay đổi cần thiết
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Cập nhật danh mục (loại bỏ CreatedBy nếu không cần thiết cập nhật)
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        // Nếu không muốn cho phép cập nhật CreatedBy thì có thể loại bỏ từ req.body
        // hoặc giữ nguyên nếu bạn muốn cho phép thay đổi
      },
      { new: true } // Trả về đối tượng mới sau khi cập nhật
    );

    // Trả về danh mục đã cập nhật
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tag
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
