import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import defaultimg from "../assets/images/other/about.jpg";

const HeroNews = () => {
  const [news, setNews] = useState(null);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate(); // Dùng để điều hướng

  useEffect(() => {
    const fetchHeroNews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/news/hero-news"
        );
        if (response.ok) {
          const data = await response.json();
          setNews(data[0]); // Giả sử chỉ có 1 tin hero trong mảng
          fetchCategories(data); // Gọi hàm fetchCategories sau khi nhận dữ liệu
        } else {
          console.error("Lỗi khi lấy tin tức hero");
        }
      } catch (error) {
        console.error("Có lỗi khi kết nối API:", error);
      }
    };

    fetchHeroNews();
  }, []);

  const fetchCategories = async (newsData) => {
    try {
      const categoryIds = newsData.map((news) => news.Category_ID_Fk);
      const uniqueCategoryIds = [...new Set(categoryIds)]; // Loại bỏ ID trùng lặp

      const categoryPromises = uniqueCategoryIds.map(async (categoryId) => {
        const response = await fetch(
          `http://localhost:5000/api/categories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching category with ID ${categoryId}`);
        }
        const category = await response.json();
        return { id: categoryId, name: category.Name }; // Giả sử API trả về đối tượng có trường 'name'
      });

      const categoriesData = await Promise.all(categoryPromises);
      const categoriesMap = categoriesData.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});
      setCategories(categoriesMap); // Cập nhật state với thông tin categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (!news) {
    return <div className="text-center">Đang tải tin tức...</div>;
  }

  const hasContent =
    news.Content &&
    news.Content.sections &&
    Array.isArray(news.Content.sections);

  if (!hasContent) {
    return (
      <div className="text-center">
        Dữ liệu không hợp lệ hoặc chưa được tải đầy đủ.
      </div>
    );
  }

  const firstText = news.Content.sections.find(
    (section) => section.type === "text"
  );
  const firstImage = news.Content.sections.find(
    (section) => section.type === "image"
  );

  const categoryName = categories[news.Category_ID_Fk];

  const handleNavigateNewSingle = () => {
    navigate(`/new-single/${news._id}`); // Điều hướng đến trang chi tiết bài viết
  };

  return (
    <div className="hero-news container my-5">
      <div
        className="border p-4 rounded shadow-lg"
        style={{ cursor: "pointer" }} // Đổi con trỏ thành pointer để hiển thị rõ ràng
        onClick={handleNavigateNewSingle} // Thêm sự kiện click
      >
        <div className="row align-items-center">
          {/* Left Column (Content) */}
          <div className="col-md-7">
            <h1 className="display-4 font-weight-bold">{news.Title}</h1>
            {categoryName && (
              <p className="text-muted">Category: {categoryName}</p>
            )}
            {firstText && <p className="lead mb-4">{firstText.content}</p>}
          </div>

          {/* Right Column (Image and Caption) */}
          <div className="col-md-5">
            {firstImage && (
              <div className="mb-3">
                <img
                  src={
                    news.Content.sections.find(
                      (section) => section.type === "image"
                    )?.content || defaultimg
                  }
                  alt={firstImage.caption}
                  className="img-fluid rounded shadow-lg"
                />
                <p className="text-center mt-2">{firstImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroNews;
