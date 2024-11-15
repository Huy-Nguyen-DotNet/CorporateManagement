const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/db'); // Import module kết nối DB
const routes = require('./routes'); // Import các route

const app = express();

// Middleware -- Nguyễn Minh Huy
app.use(cors());
app.use(express.json());
app.use(helmet()); // Thêm middleware helmet

const PORT = process.env.PORT || 5000;

// Kiểm tra biến môi trường
if (!process.env.MONGODB_URI) {
  console.error("MongoDB URI is missing in environment variables");
  process.exit(1); // Dừng ứng dụng nếu không có URI
}

// Kết nối MongoDB
connectDB();

// Use centralized routes
app.use('/api', routes);

// Xử lý lỗi API (nếu có)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});