import React, { useState, useEffect } from "react";
import defaultimg from "../assets/images/other/about.jpg";
import "../assets/css/componentsCSS/FeaturedNews.css";

const FeaturedNews = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState({}); // State để lưu tên category theo ID

  // Hàm fetch API lấy bài viết nổi bật
  const fetchFeaturedNews = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/news/featured-news"
      ); // URL API
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data); // Cập nhật state với danh sách bài viết nổi bật
      fetchCategories(data); // Gọi hàm lấy thông tin category khi đã có bài viết
    } catch (error) {
      console.error("Error fetching featured news:", error);
    }
  };

  // Hàm fetch API lấy category từ Category_ID_FK
  const fetchCategories = async (newsData) => {
    try {
      const categoryIds = newsData.map((news) => news.Category_ID_Fk);
      const uniqueCategoryIds = [...new Set(categoryIds)]; // Loại bỏ ID trùng lặp

      // Lấy thông tin các category cùng lúc
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

  // Gọi fetch API khi component render lần đầu
  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  return (
    <div className="section-header">
      <h3 className="section-title font-weight-bold">Bài Viết Nổi Bật</h3>
      <img src="images/wave.svg" className="wave" alt="wave" />

      <div className="padding-30 rounded bordered m-t-30">
        <div className="row gy-5">
          {news.length > 0 && (
            <>
              {/* Bài viết đầu tiên - nổi bật */}
              <div className="col-sm-6">
                <div className="post post-featured">
                  <div className="thumb rounded">
                    <a
                      href="category.html"
                      className="category-badge position-absolute"
                    >
                      {/* Hiển thị category cho bài viết đầu tiên */}
                      {categories[news[0].Category_ID_Fk] || "Unknown Category"}
                    </a>
                    <span className="post-format">
                      <i className="icon-picture"></i>
                    </span>
                    <a href={`blog/${news[0]._id}`}>
                      <div className="inner">
                        <img
                          src={
                            news[0].Content.sections.find(
                              (section) => section.type === "image"
                            )?.content || defaultimg
                          }
                          alt={news[0].Title}
                        />
                      </div>
                    </a>
                  </div>
                  <ul className="meta list-inline mt-4 mb-0">
                    <li className="list-inline-item">
                      <a>{news[0].CreatedBy || "Admin"}</a>
                    </li>
                    <li className="list-inline-item">
                      {new Date(news[0].createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                  <h5 className="post-title mb-3 mt-3">
                    <a
                      href={`blog/${news[0]._id}`}
                      className="text-decoration-none font-weight-bold"
                    >
                      {news[0].Title}
                    </a>
                  </h5>
                  <p className="text">
                    {/* Hiển thị dòng text đầu tiên trong content */}
                    {news[0].Content.sections &&
                      news[0].Content.sections[0]?.content}
                  </p>
                  <p className="excerpt mb-0">
                    {news[0].MetaDescription || ""}
                  </p>
                </div>
              </div>

              {/* Các bài viết còn lại - Trending */}
              <div className="col-sm-6">
                {news.slice(1).map((item) => (
                  <div key={item._id} className="post post-list-sm square">
                    <div className="thumb rounded">
                      <a href={`blog/${item._id}`}>
                        <div className="inner">
                          <img
                            src={
                              item.Content.sections.find(
                                (section) => section.type === "image"
                              )?.content || defaultimg
                            }
                            alt={item.Title}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0">
                        <a
                          href={`blog/${item._id}`}
                          className="text-decoration-none font-weight-bold"
                        >
                          {item.Title}
                        </a>
                      </h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">
                          <a>{news[0].CreatedBy || "Admin"}</a>
                        </li>
                        <li className="list-inline-item">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;
