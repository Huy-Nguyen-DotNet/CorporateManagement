const multer = require("multer");
const path = require("path");

// Cấu hình dynamic storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      req.body.type === "news" ? "uploads/news/" : "uploads/avatars/";
    cb(null, folder); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Bộ lọc file: chỉ cho phép ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép upload file ảnh!"), false);
  }
};

// Cấu hình Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
