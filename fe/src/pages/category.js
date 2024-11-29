import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Popular from "../components/PopularNews";
import WidgetTags from "../components/widgetTags";
import defaultimg from "../assets/images/other/about.jpg";
import WidgetCategories from "../components/widgetCategories";

const Category = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [categories, setCategories] = useState({});
  const [newsData, setNewsData] = useState([]);
  const [categoryName, setCategoryName] = useState(""); // State để lưu tên danh mục

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

      // Lấy tên danh mục từ dữ liệu bài viết
      if (newsData.length > 0) {
        const firstNewsCategory = newsData[0].Category_ID_Fk;
        setCategoryName(categoriesMap[firstNewsCategory] || "Unknown"); // Cập nhật tên danh mục
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Hàm fetch dữ liệu bài viết từ API theo categoryId
  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/news/category/${id}` // Gọi API với ID từ URL
      );
      if (!response.ok) {
        throw new Error("Error fetching news data");
      }
      const data = await response.json();
      setNewsData(data); // Cập nhật state với dữ liệu bài viết
      fetchCategories(data); // Gọi hàm fetchCategories để lấy thông tin danh mục
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  // Gọi fetchNewsData khi component được mount hoặc khi `id` thay đổi
  useEffect(() => {
    fetchNewsData();
  }, [id]); // Gọi lại hàm fetch khi `id` thay đổi

  return (
    <div>
      <section className="page-header">
        <div className="container-xl">
          <div className="text-center">
            <h1 className="mt-0 mb-2">{categoryName || "Lifestyle"}</h1>{" "}
            {/* Hiển thị tên danh mục */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {categoryName || "Lifestyle"} {/* Hiển thị tên danh mục */}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="container-xl">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="row gy-4">
                {newsData.map((news, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="post post-grid rounded bordered">
                      <div className="thumb top-rounded">
                        <Link
                          to="category.html"
                          className="category-badge position-absolute"
                        >
                          {/* Hiển thị tên danh mục nếu có */}
                          {categories[news.Category_ID_Fk] || "Unknown"}
                        </Link>
                        <Link to="blog-single.html">
                          <div className="inner">
                            <img
                              src={
                                news.Content.sections.find(
                                  (section) => section.type === "image"
                                )?.content || defaultimg
                              }
                              alt="post-title"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="details">
                        <ul className="meta list-inline mb-0">
                          <li className="list-inline-item">
                            <a href="#">{news.CreatedBy}</a>
                          </li>
                          <li className="list-inline-item">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </li>
                        </ul>
                        <h5 className="post-title mb-3 mt-3">
                          <a href={`/new-single/${news._id}`}>{news.Title}</a>
                        </h5>
                        <p className="text">
                          {/* Hiển thị dòng text đầu tiên trong content */}
                          {news.Content.sections &&
                            news.Content.sections[0]?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <Popular />
              <WidgetCategories />
              <WidgetTags />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
