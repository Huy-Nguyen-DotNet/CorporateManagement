import React, { useState, useEffect } from "react";
import DataTable from "../../components/dataTables.js";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/Breadcrumb";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Bài Viết", link: "" },
  ];

  const columns = [
    { key: "title", label: "Tiêu Đề" },
    { key: "createdAt", label: "Ngày Tạo" },
    { key: "createdBy", label: "Người Tạo" },
    { key: "status", label: "Trạng Thái" },
    { key: "trending", label: "Xu Hướng" },
    { key: "featured", label: "Nổi Bật" },
    { key: "viewCount", label: "Lượt Xem" },
  ];

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, {
        autoClose: 10000,
      });
    }
    fetchNews();
  }, []);

  const fetchNews = () => {
    fetch("http://localhost:5000/api/news")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const transformedData = data.map((newsItem) => ({
          id: newsItem._id,
          title: newsItem.Title,
          createdAt: new Date(newsItem.createdAt).toLocaleDateString("vi-VN"),
          createdBy: newsItem.CreatedBy || "Chưa có thông tin người tạo",
          status: newsItem.Status ? "Hoạt động" : "Không hoạt động",
          trending: newsItem.IsTrending ? "Xu Hướng" : "Không",
          featured: newsItem.IsFeatured ? "Nổi Bật" : "Không",
          viewCount: newsItem.ViewCount,
        }));
        setNewsList(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        setLoading(false);
      });
  };

  const handleRowDoubleClick = (rowData) => {
    navigate(`/admin-news/${rowData.id}`);
  };

  if (loading) {
    return (
      <div>
        <AdminHeader />
        <div>Đang tải dữ liệu...</div>
        <AdminSideNav />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        <div className="main-content">
          <div className="tab-content m-t-15">
            <div className="tab-pane fade show active" id="tab-news">
              <Breadcrumb categories={level} />
              <h2>Quản Lý Bài Viết</h2>
              <DataTable
                key="newsTable"
                columns={columns}
                data={newsList}
                onRowDoubleClick={handleRowDoubleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
      <ToastContainer />
    </div>
  );
};

export default News;
