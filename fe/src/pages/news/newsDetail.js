import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer và toast
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo Bootstrap đã được import
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toastify

const NewsDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Điều khiển modal
  const [showModalTrend, setShowModalTrend] = useState(false); // Điều khiển modal
  const [isFeatured, setIsFeatured] = useState(false); // Trạng thái Nổi bật
  const [isTrending, setIsTrending] = useState(false); // Trạng thái Nổi bật
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  // Khai báo state để lưu trạng thái isHero
  const [isHero, setIsHero] = useState(false);

  useEffect(() => {
    fetchNewsDetail(id);
  }, [id]);

  const fetchNewsDetail = (id) => {
    fetch(`http://localhost:5000/api/news/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra xem trường content có phải là chuỗi JSON không
        if (data.content && typeof data.content === "string") {
          try {
            // Cố gắng phân tích chuỗi JSON
            data.content = JSON.parse(data.content);
          } catch (error) {
            console.error("Lỗi khi phân tích chuỗi JSON:", error);
            data.content = {}; // Nếu không thể phân tích, gán là đối tượng rỗng
          }
        }
        setNewsDetail(data);
        setIsFeatured(data.IsFeatured); // Cập nhật trạng thái Nổi bật
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết bài viết:", error);
        setLoading(false);
      });
  };

  const handleToggleFeatured = () => {
    // Mở modal xác nhận khi thay đổi trạng thái "Nổi bật"
    setShowModal(true);
  };

  const handleToggleTrending = () => {
    // Mở modal xác nhận khi thay đổi trạng thái "Xu hướng"
    setShowModalTrend(true);
  };

  // Xác nhận thay đổi trạng thái "Nổi bật"
  const handleConfirmToggle = () => {
    const updatedStatus = !isFeatured;
    fetch(`http://localhost:5000/api/news/update-status/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsFeatured: updatedStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewsDetail(data);
        setIsFeatured(updatedStatus);
        setShowModal(false);
        toast.success(
          `Trạng thái "Nổi bật" đã ${updatedStatus ? "bật" : "tắt"} thành công!`
        );
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái Nổi bật:", error);
        setShowModal(false); // Đóng modal nếu có lỗi
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái.");
      });
  };

  // Xác nhận thay đổi trạng thái "Xu hướng"
  const handleConfirmToggleTrend = () => {
    const updatedStatus = !isTrending;
    fetch(`http://localhost:5000/api/news/update-status/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsTrending: updatedStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewsDetail(data);
        setIsTrending(updatedStatus);
        setShowModalTrend(false);
        toast.success(
          `Trạng thái "Xu hướng" đã ${
            updatedStatus ? "bật" : "tắt"
          } thành công!`
        );
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái Xu hướng:", error);
        setShowModalTrend(false);
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái Xu hướng.");
      });
  };

  if (loading) {
    return (
      <div>
        <AdminHeader />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h4>Đang tải dữ liệu...</h4>
            </div>
          </div>
        </div>
        <AdminSideNav />
      </div>
    );
  }

  const handleToggleHero = () => {
    const updatedStatus = !isHero; // Đảo trạng thái IsHero

    // Gửi yêu cầu POST đến API để cập nhật IsHero
    fetch(`http://localhost:5000/api/news/update-status/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsHero: updatedStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Cập nhật lại trạng thái IsHero sau khi gửi yêu cầu thành công
        setIsHero(updatedStatus);
        toast.success(
          `Bài viết đã ${
            updatedStatus ? "được đưa lên đầu trang" : "hủy lên đầu trang"
          } thành công!`
        );
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái IsHero:", error);
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái.");
      });
  };

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        <div className="main-content">
          <div className="container my-5">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h4>Chi Tiết Bài Viết</h4>
                  </div>
                  <div className="card-body">
                    {newsDetail ? (
                      <div>
                        <h2>{newsDetail.Title}</h2>
                        <p className="text-muted">
                          <strong>Người tạo:</strong>{" "}
                          {newsDetail.CreatedBy || "Chưa có thông tin"}
                        </p>
                        <p className="text-muted">
                          <strong>Ngày tạo:</strong>{" "}
                          {new Date(newsDetail.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>

                        <div className="my-4">
                          <h5>Trạng thái:</h5>
                          <p>
                            {newsDetail.Status
                              ? "Hoạt động"
                              : "Không hoạt động"}
                          </p>
                        </div>
                        <div className="my-4">
                          <h5>Xu hướng:</h5>
                          <p>{newsDetail.IsTrending ? "Xu hướng" : "Không"}</p>
                          <button
                            className={`btn ${
                              isTrending ? "btn-warning" : "btn-success"
                            }`}
                            onClick={handleToggleTrending}
                          >
                            {isTrending ? "Tắt Xu Hướng" : "Bật Xu hướng"}
                          </button>
                        </div>
                        <div className="my-4">
                          <h5>Nổi bật:</h5>
                          <p>{isFeatured ? "Nổi bật" : "Không"}</p>
                          <button
                            className={`btn ${
                              isFeatured ? "btn-warning" : "btn-success"
                            }`}
                            onClick={handleToggleFeatured}
                          >
                            {isFeatured ? "Tắt Nổi bật" : "Bật Nổi bật"}
                          </button>
                        </div>
                        <div className="my-4">
                          <h5>Lượt xem:</h5>
                          <p>{newsDetail.ViewCount}</p>
                        </div>

                        {/* Nếu content là một đối tượng hoặc mảng, có thể render như sau */}
                        {typeof newsDetail.content === "object" &&
                          newsDetail.content !== null && (
                            <div className="my-4">
                              <h5>Chi tiết nội dung (JSON):</h5>
                              <pre>
                                {JSON.stringify(newsDetail.content, null, 2)}
                              </pre>
                            </div>
                          )}

                        {/* Nếu sections là một mảng, bạn có thể render như sau */}
                        {newsDetail.sections &&
                          Array.isArray(newsDetail.sections) && (
                            <div className="my-4">
                              <h5>Sections:</h5>
                              <ul>
                                {newsDetail.sections.map((section, index) => (
                                  <li key={index}>{section.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    ) : (
                      <p>Không tìm thấy thông tin bài viết</p>
                    )}
                    {/* Nút quay về */}
                    <div className="my-4">
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                      >
                        Quay về
                      </button>
                      <button
                        className={`btn m-l-20 ${
                          isHero ? "btn-danger" : "btn-success"
                        }`}
                        onClick={handleToggleHero}
                      >
                        {isHero ? "Hủy đưa lên đầu trang" : "Đưa lên đầu trang"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận trạng thái Xu hướng */}
      {showModalTrend && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Xác nhận thay đổi trạng thái Xu Hướng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModalTrend(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Bạn có muốn {isTrending ? "tắt" : "bật"} trạng thái Xu Hướng cho
                bài viết này?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModalTrend(false)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmToggleTrend}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận trạng thái Nổi bật */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Xác nhận thay đổi trạng thái Nổi bật
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Bạn có muốn {isFeatured ? "tắt" : "bật"} trạng thái Nổi bật cho
                bài viết này?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmToggle}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminSideNav />

      {/* Container cho thông báo Toast */}
      <ToastContainer />
    </div>
  );
};

export default NewsDetail;
