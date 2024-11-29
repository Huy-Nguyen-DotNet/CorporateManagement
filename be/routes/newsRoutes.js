const express = require("express");
const router = express.Router();
const News = require("../models/News"); // Đảm bảo bạn đã định nghĩa model News

// Lấy tất cả các bài viết, sắp xếp theo createdAt
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo giảm dần
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy dữ liệu." });
  }
});

router.post("/update-status/:id", async (req, res) => {
  const { IsFeatured, IsTrending, IsHero } = req.body;
  const newsId = req.params.id; // Lấy newsId từ URL

  console.log("Received update for news ID:", newsId);
  console.log(
    "isFeatured:",
    IsFeatured,
    "isTrending:",
    IsTrending,
    "isHero:",
    IsHero
  );

  try {
    // Tìm bài viết với newsId
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    // Kiểm tra nếu số lượng bài viết trending hoặc featured đã đủ 5 và cần thay thế
    if (IsFeatured) {
      const featuredCount = await News.countDocuments({ IsFeatured: true });
      if (featuredCount >= 5) {
        const oldestFeatured = await News.findOne({ IsFeatured: true })
          .sort({ createdAt: 1 })
          .limit(1);
        if (oldestFeatured) {
          oldestFeatured.IsFeatured = false;
          await oldestFeatured.save();
          console.log("Removed Featured status from:", oldestFeatured._id);
        }
      }
    }

    if (IsTrending) {
      const trendingCount = await News.countDocuments({ IsTrending: true });
      if (trendingCount >= 5) {
        const oldestTrending = await News.findOne({ IsTrending: true })
          .sort({ createdAt: 1 })
          .limit(1);
        if (oldestTrending) {
          oldestTrending.IsTrending = false;
          await oldestTrending.save();
          console.log("Removed Trending status from:", oldestTrending._id);
        }
      }
    }

    // Kiểm tra và cập nhật bài viết hero
    if (IsHero) {
      // Xóa hero của bài viết cũ
      await News.updateMany({ IsHero: true }, { $set: { IsHero: false } });

      // Cập nhật IsHero cho bài viết hiện tại
      news.IsHero = true;
    } else {
      // Nếu không phải hero thì đảm bảo là false
      news.IsHero = false;
    }

    // Cập nhật các trường IsFeatured và IsTrending
    news.IsFeatured = IsFeatured;
    news.IsTrending = IsTrending;

    console.log("Updating news with ID:", news._id);
    console.log(
      "New IsFeatured:",
      news.IsFeatured,
      "New IsTrending:",
      news.IsTrending,
      "New IsHero:",
      news.IsHero
    );

    // Lưu lại thay đổi
    await news.save();

    res.status(200).json({ message: "Cập nhật thành công", news });
  } catch (error) {
    console.error("Có lỗi khi cập nhật bài viết:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật bài viết" });
  }
});

router.get("/featured-news", async (req, res) => {
  try {
    const featuredNews = await News.find({ IsFeatured: true }).sort({
      createdAt: -1,
    }); // Sắp xếp mới nhất
    res.status(200).json(featuredNews);
  } catch (error) {
    console.error("Error fetching featured news:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy bài viết nổi bật" });
  }
});
// Lấy 6 bài viết trending mới nhất
router.get("/trending-news", async (req, res) => {
  try {
    const trendingNews = await News.find({ IsTrending: true })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo giảm dần
      .limit(5); // Lấy 6 bài viết mới nhất

    res.status(200).json(trendingNews);
  } catch (error) {
    console.error("Error fetching trending news:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy bài viết trending" });
  }
});

// Lấy 5 bài viết có thời gian tạo sớm nhất
router.get("/latest-news", async (req, res) => {
  try {
    // Sắp xếp theo thời gian tạo tăng dần và giới hạn chỉ lấy 5 bài viết đầu tiên
    const oldestNews = await News.find()
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo tăng dần (sớm nhất)
      .limit(5); // Lấy 5 bài viết đầu tiên

    res.status(200).json(oldestNews);
  } catch (error) {
    console.error("Error fetching oldest news:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy bài viết cũ nhất" });
  }
});

// Route xóa bài viết theo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa bài viết theo ID
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "Bài viết không tìm thấy" });
    }

    res
      .status(200)
      .json({ message: "Bài viết đã được xóa thành công", deletedNews });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa bài viết" });
  }
});

// Lấy bài viết Hero (IsHero = true)
router.get("/hero-news", async (req, res) => {
  try {
    const heroNews = await News.find({ IsHero: true });
    res.status(200).json(heroNews);
  } catch (error) {
    console.error("Error fetching hero news:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy bài viết Hero" });
  }
});

// Lấy 3 bài viết có ViewCount cao nhất
router.get("/popular-news", async (req, res) => {
  try {
    const popularNews = await News.find()
      .sort({ ViewCount: -1 }) // Sắp xếp theo ViewCount giảm dần
      .limit(3); // Lấy 3 bài viết có ViewCount cao nhất

    res.status(200).json(popularNews);
  } catch (error) {
    console.error("Error fetching popular news:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy bài viết phổ biến" });
  }
});

// Lấy bài viết theo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm bài viết theo ID
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: "Bài viết không tìm thấy" });
    }

    res.status(200).json(news); // Trả về bài viết
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy bài viết" });
  }
});

// Lấy các bài viết theo category_ID_fK
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params; // Lấy categoryId từ URL

    // Tìm các bài viết theo category_ID_fK
    const newsByCategory = await News.find({ Category_ID_Fk: categoryId }).sort(
      {
        createdAt: -1, // Sắp xếp theo thời gian tạo giảm dần
      }
    );

    if (!newsByCategory || newsByCategory.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết trong danh mục này" });
    }

    res.status(200).json(newsByCategory); // Trả về các bài viết
  } catch (error) {
    console.error("Error fetching news by category:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy bài viết theo danh mục" });
  }
});

// Tìm kiếm bài viết theo tiêu đề chứa từ khóa
router.get("/search/query", async (req, res) => {
  try {
    const { query } = req.query; // Lấy từ khóa tìm kiếm từ query string

    if (!query) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp từ khóa tìm kiếm" });
    }

    // Tìm tất cả các bài viết có Title chứa từ khóa
    const searchResults = await News.find({
      Title: { $regex: query, $options: "i" }, // $options: "i" để tìm kiếm không phân biệt chữ hoa chữ thường
    }).sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo giảm dần

    // Kiểm tra nếu không có kết quả
    if (searchResults.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài viết nào" });
    }

    res.status(200).json(searchResults); // Trả về kết quả tìm kiếm
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi tìm kiếm bài viết" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Tạo bài viết mới, sử dụng _id của người dùng từ token
    const newNews = new News({
      ...req.body,
    });

    const news = await newNews.save();
    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error.message); // Log lỗi nếu có
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
