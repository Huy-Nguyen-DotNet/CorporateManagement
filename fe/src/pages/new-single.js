import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popular from "../components/PopularNews";
import WidgetTags from "../components/widgetTags";
import WidgetCategories from "../components/widgetCategories";

const NewSingle = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("ID từ URL:", id);

  useEffect(() => {
    // Fetch news data by ID
    const fetchNews = async () => {
      if (!id) {
        console.error("ID không hợp lệ.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/news/${id}`);
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!news) {
    return <p>News not found.</p>;
  }

  console.log(news);

  return (
    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div className="post post-single">
              {/* Header */}
              <div className="post-header">
                <h1 className="title mt-0 mb-3">{news.Title}</h1>
                <ul className="meta list-inline mb-0">
                  <li className="list-inline-item">
                    <a>{news.CreatedBy}</a>
                  </li>
                  <li className="list-inline-item">
                    {news.IsTrending ? "Xu hướng" : "Bình Thường"}
                  </li>
                  <li className="list-inline-item">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </li>
                </ul>
              </div>

              <div className="post-content clearfix">
                {news.Content?.sections?.map((section, index) => {
                  if (section.type === "text") {
                    return <p key={index}>{section.content}</p>;
                  }
                  if (section.type === "image") {
                    return (
                      <figure className="figure" key={index}>
                        <img
                          src={section.content}
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                        <figcaption className="figure-caption text-center">
                          {section.caption}
                        </figcaption>
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Tags and Social Icons */}
              <div className="post-bottom">
                <div className="row d-flex align-items-center">
                  <div className="col-md-6 col-12 text-center text-md-start">
                    <a href="#" className="tag">
                      #Trending
                    </a>
                    <a href="#" className="tag">
                      #Video
                    </a>
                    <a href="#" className="tag">
                      #Featured
                    </a>
                  </div>
                  <div className="col-md-6 col-12">
                    <ul className="social-icons list-unstyled list-inline mb-0 float-md-end">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <Popular />
            <WidgetCategories />
            <WidgetTags />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSingle;
