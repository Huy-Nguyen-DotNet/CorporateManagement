import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Popular from "../components/PopularNews";
import WidgetTags from "../components/widgetTags";
import WidgetCategories from "../components/widgetCategories";
import defaultimg from "../assets/images/other/about.jpg"; // Hình ảnh mặc định nếu không có ảnh bài viết

const SearchPage = () => {
  const { query } = useParams(); // Lấy query từ URL
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(""); // Quản lý lỗi nếu có trong quá trình fetch

  // Hàm gọi API để lấy kết quả tìm kiếm
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/news/search/query?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy kết quả tìm kiếm");
        }
        const data = await response.json();
        console.log(data);
        setSearchResults(data); // Lưu kết quả tìm kiếm vào state
      } catch (error) {
        setError(error.message); // Cập nhật lỗi nếu có
      } finally {
        setLoading(false); // Khi dữ liệu đã được tải
      }
    };

    fetchSearchResults();
  }, [query]); // Mỗi khi query thay đổi, gọi lại API

  return (
    <div>
      <section className="main-content">
        <div className="container-xl">
          <div className="row gy-4">
            <div className="col-lg-8">
              <h2>Kết quả tìm kiếm cho: "{query}"</h2>
              {/* Hiển thị thông báo khi đang tải hoặc có lỗi */}
              {loading && <p>Đang tải kết quả...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="row gy-4">
                {/* Hiển thị các bài viết tìm kiếm */}
                {searchResults.length === 0 && !loading && !error && (
                  <p>Không có kết quả tìm kiếm phù hợp.</p>
                )}
                {searchResults.map((news, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="post post-grid rounded bordered">
                      <div className="thumb top-rounded">
                        <Link to={`/new-single/${news._id}`}>
                          <div className="inner">
                            <img
                              src={
                                news.Content.sections.find(
                                  (section) => section.type === "image"
                                )?.content || defaultimg
                              }
                              alt={news.Title}
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

export default SearchPage;
