import React, { useEffect, useState } from "react";
import defaultimg from "../assets/images/other/about.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../assets/css/componentsCSS/PopularNews.css";

const PopularNews = () => {
  const navigate = useNavigate(); // Dùng để điều hướng
  const [popularPosts, setPopularPosts] = useState([]);

  // Hàm fetch dữ liệu bài viết phổ biến (Ví dụ lấy dữ liệu từ API)
  const fetchPopularPosts = async () => {
    try {
      // Giả sử bạn có một API trả về danh sách bài viết phổ biến
      const response = await fetch(
        "http://localhost:5000/api/news/popular-news"
      );
      if (!response.ok) {
        throw new Error("Error fetching popular posts");
      }
      const data = await response.json();
      setPopularPosts(data); // Giả sử dữ liệu trả về là mảng bài viết
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  };

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title font-weight-bold">Bài Viết Phổ Biến</h3>
      </div>
      <div className="widget-content">
        {popularPosts.length > 0 ? (
          popularPosts.map((post, index) => (
            <div className="post post-list-sm circle" key={post._id}>
              <div className="thumb circle">
                <span className="number">{index + 1}</span>
                <a href={`/new-single/${post._id}`}>
                  <div className="inner">
                    <img
                      src={
                        post.Content.sections.find(
                          (section) => section.type === "image"
                        )?.content || defaultimg
                      }
                      alt={post.Title}
                      className="popular-news"
                    />
                  </div>
                </a>
              </div>
              <div className="details clearfix">
                <h6 className="post-title my-0">
                  <a
                    href={`/new-single/${post._id}`}
                    className="text-decoration-none font-weight-bold"
                  >
                    {post.Title}
                  </a>
                </h6>
                <ul className="meta list-inline mt-1 mb-0">
                  <li className="list-inline-item">
                    <a>{post.CreatedBy}</a>
                  </li>
                  <li className="list-inline-item">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div>Đang tải bài viết...</div>
        )}
      </div>
    </div>
  );
};

export default PopularNews;
