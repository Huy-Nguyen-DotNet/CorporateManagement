const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');  // Thêm helmet để bảo mật
require('dotenv').config();

const app = express();

// Middleware -- Nguyễn Minh Huy
app.use(cors());
app.use(express.json());
app.use(helmet());  // Thêm middleware helmet

const PORT = process.env.PORT || 5000;

// Kiểm tra biến môi trường MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error("MongoDB URI is missing in environment variables");
  process.exit(1);  // Dừng ứng dụng nếu không có URI
}

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);  // Dừng ứng dụng nếu không thể kết nối
});

// Định nghĩa route cơ bản
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Xử lý lỗi API (nếu có)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


