import React, { useState, useEffect } from "react";

const FeaturedNews = () => {
  const [news, setNews] = useState([]);

  // Hàm fetch API
  const fetchFeaturedNews = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/news/featured-news"
      ); // URL API
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data); // Cập nhật state với danh sách bài viết
    } catch (error) {
      console.error("Error fetching featured news:", error);
    }
  };

  // Gọi fetch API khi component render lần đầu
  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  return (
    <div className="section-header">
      <h3 className="section-title">Editor’s Pick</h3>
      <img src="images/wave.svg" className="wave" alt="wave" />

      <div className="padding-30 rounded bordered">
        <div className="row gy-5">
          {news.length > 0 && (
            <>
              {/* Bài viết đầu tiên */}
              <div className="col-sm-6">
                <div className="post">
                  <div className="thumb rounded">
                    <a
                      href="category.html"
                      className="category-badge position-absolute"
                    >
                      {news[0].category || "Unknown Category"}
                    </a>
                    <span className="post-format">
                      <i className="icon-picture"></i>
                    </span>
                    <a href={`blog/${news[0]._id}`}>
                      <div className="inner">
                        <img
                          src={news[0].Images[0] || "images/default.jpg"}
                          alt={news[0].Title}
                        />
                      </div>
                    </a>
                  </div>
                  <ul className="meta list-inline mt-4 mb-0">
                    <li className="list-inline-item">
                      <a href="#">
                        <img
                          src="images/other/author-sm.png"
                          className="author"
                          alt="author"
                        />
                        {news[0].CreatedBy || "Admin"}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      {new Date(news[0].createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                  <h5 className="post-title mb-3 mt-3">
                    <a href={`blog/${news[0]._id}`}>{news[0].Title}</a>
                  </h5>
                  <p className="excerpt mb-0">
                    {news[0].MetaDescription || ""}
                  </p>
                </div>
              </div>

              {/* Các bài viết còn lại */}
              <div className="col-sm-6">
                {news.slice(1).map((item) => (
                  <div key={item._id} className="post post-list-sm square">
                    <div className="thumb rounded">
                      <a href={`blog/${item._id}`}>
                        <div className="inner">
                          <img
                            src={item.Images[0] || "images/default.jpg"}
                            alt={item.Title}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0">
                        <a href={`blog/${item._id}`}>{item.Title}</a>
                      </h6>
                      <ul className="meta list-inline mt-1 mb-0">
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
