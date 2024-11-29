import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../assets/images/other/about.jpg";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleSocialIcons = () => {
    setIsVisible(!isVisible);
  };

  // Hàm fetch dữ liệu category
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

  // Fetch bài viết mới nhất khi component load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news/latest-news") // Đảm bảo rằng route này đúng với API của bạn
      .then((response) => {
        const fetchedNews = response.data;
        setNews(fetchedNews); // Lưu dữ liệu bài viết vào state
        fetchCategories(fetchedNews); // Gọi hàm fetchCategories để lấy danh mục
        setLoading(false); // Cập nhật trạng thái loading
      })
      .catch((err) => {
        setError("Có lỗi xảy ra khi tải dữ liệu.");
        setLoading(false);
        console.error(err);
      });
  }, []); // useEffect chỉ chạy một lần khi component được render lần đầu

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="latest-news">
      <div className="section-header">
        <h3 className="section-title font-weight-bold">Bài Viết Mới Nhất</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>

      <div className="padding-30 rounded bordered">
        <div className="row">
          {news.map((post) => (
            <div className="col-md-12 col-sm-6" key={post._id}>
              <div className="post post-list clearfix">
                <div className="thumb rounded">
                  <span className="post-format-sm">
                    <i className="icon-picture"></i>
                  </span>
                  <a href="blog-single.html">
                    <div className="inner">
                      <img
                        src={
                          post.Content.sections.find(
                            (section) => section.type === "image"
                          )?.content || defaultimg
                        }
                        alt={post.Title}
                      />
                    </div>
                  </a>
                </div>
                <div className="details">
                  <ul className="meta list-inline mb-3">
                    <li className="list-inline-item">
                      <a>{post.CreatedBy}</a>
                    </li>
                    {/* Hiển thị tên category */}
                    <li className="list-inline-item">
                      <a className="text-decoration-none">
                        {categories[post.Category_ID_Fk] || "Chưa có danh mục"}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                  <h5 className="post-title">
                    <a
                      href={`/new-single/${post._id}`}
                      className="text-decoration-none font-weight-bold"
                    >
                      {post.Title}
                    </a>
                  </h5>
                  <p className="text">
                    {/* Hiển thị dòng text đầu tiên trong content */}
                    {post.Content.sections && post.Content.sections[0]?.content}
                  </p>
                  <div className="post-bottom clearfix d-flex align-items-center">
                    <div className="social-share me-auto">
                      <button
                        className="toggle-button icon-share"
                        onClick={toggleSocialIcons}
                      ></button>
                      {isVisible && (
                        <ul className="icons  list-inline mb-0 visible">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fab fa-pinterest"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fab fa-telegram-plane"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="far fa-envelope"></i>
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
