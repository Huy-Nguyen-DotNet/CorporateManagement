import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/Breadcrumb";

const AccountDetail = () => {
  const { id } = useParams(); // Lấy id từ URL params
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Trạng thái modal thay đổi vai trò
  const [newRole, setNewRole] = useState(""); // Vai trò mới
  const [showStatusModal, setShowStatusModal] = useState(false); // Trạng thái modal xác nhận
  const [statusAction, setStatusAction] = useState(null); // Hành động cần thực hiện: "activate" hoặc "deactivate"
  const navigate = useNavigate();
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false); // Trạng thái modal reset mật khẩu

  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Tài Khoản", link: "/admin-account" },
    { name: "Chi Tiết Tài Khoản", link: "" },
  ];

  useEffect(() => {
    fetchAccountDetail();
  }, [id]);

  // Lấy thông tin chi tiết tài khoản
  const fetchAccountDetail = () => {
    fetch(`http://localhost:5000/api/accounts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
        setLoading(false);
        setNewRole(data.Role); // Cập nhật vai trò hiện tại
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
        setLoading(false);
      });
  };

  // Hàm quay lại trang trước
  const handleBack = () => {
    navigate(-1);
  };

  // Hàm mở modal thay đổi vai trò
  const handleChangeRole = () => {
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hàm mở modal xác nhận thay đổi trạng thái
  const handleToggleStatus = () => {
    if (account.Status) {
      // Nếu tài khoản đang hoạt động, sẽ yêu cầu vô hiệu hóa
      setStatusAction("deactivate");
      setShowStatusModal(true);
    } else {
      // Nếu tài khoản không hoạt động, sẽ yêu cầu kích hoạt
      setStatusAction("activate");
      setShowStatusModal(true);
    }
  };

  // Hàm thực hiện cập nhật trạng thái tài khoản
  const handleUpdateStatus = () => {
    // Xác định trạng thái tài khoản (true nếu kích hoạt, false nếu vô hiệu hóa)
    const newStatus = statusAction === "activate"; // Nếu là 'activate', giá trị sẽ là true, ngược lại là false

    const url = `http://localhost:5000/api/accounts/update-status/${id}`;
    const method = "PUT"; // Sử dụng phương thức PUT để cập nhật dữ liệu

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Status: newStatus }), // Truyền true hoặc false vào API
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Cập nhật trạng thái thất bại");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Thông báo thành công
        toast.success(
          `Tài khoản ${
            newStatus ? "được kích hoạt" : "được vô hiệu hóa"
          } thành công!`
        );
        // Cập nhật lại trạng thái tài khoản
        setAccount((prevState) => {
          return { ...prevState, Status: newStatus };
        });
        setShowStatusModal(false); // Đóng modal sau khi cập nhật
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        toast.error(`Cập nhật trạng thái thất bại: ${error.message}`);
        console.error("Lỗi khi cập nhật trạng thái:", error);
      });
  };

  // Hàm đóng modal xác nhận thay đổi trạng thái
  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
  };

  // Hàm xử lý thay đổi vai trò
  const handleUpdateRole = () => {
    fetch(`http://localhost:5000/api/accounts/update-role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Role: newRole }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Cập nhật thất bại");
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Cập nhật vai trò thành công!");
        setAccount((prevState) => {
          return { ...prevState, Role: newRole };
        });
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(`Cập nhật vai trò thất bại: ${error.message}`);
        console.error("Lỗi khi cập nhật vai trò:", error);
      });
  };

  // Hàm mở modal reset mật khẩu
  const handleShowResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  // Hàm đóng modal reset mật khẩu
  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordModal(false);
  };

  // Hàm reset mật khẩu
  const handleResetPassword = () => {
    fetch(`http://localhost:5000/api/accounts/reset-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Reset mật khẩu thất bại");
        }
        return response.json();
      })
      .then((data) => {
        toast.success(data.message || "Mật khẩu đã được reset thành công");
        setShowResetPasswordModal(false); // Đóng modal sau khi reset thành công
      })
      .catch((error) => {
        toast.error(error.message || "Lỗi khi reset mật khẩu");
      });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái modal xác nhận xóa tài khoản

  // Hàm mở modal xác nhận xóa tài khoản
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // Hàm đóng modal xác nhận xóa tài khoản
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Hàm xử lý xóa tài khoản
  const handleDeleteAccount = () => {
    fetch(`http://localhost:5000/api/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Xóa tài khoản thất bại");
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Tài khoản đã được xóa thành công!");
        setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
        navigate("/admin-account"); // Điều hướng quay lại trang quản lý tài khoản
      })
      .catch((error) => {
        toast.error(`Xóa tài khoản thất bại: ${error.message}`);
        console.error("Lỗi khi xóa tài khoản:", error);
      });
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

  if (!account) {
    return (
      <div>
        <AdminHeader />
        <div>Tài khoản không tồn tại</div>
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
            <div className="tab-pane fade show active" id="tab-account">
              <Breadcrumb categories={level} />
              <div className="card">
                <div className="card-header">
                  <h3>Chi tiết tài khoản {account.Username}</h3>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Tên đăng nhập:</strong> {account.Username}
                  </p>
                  <p>
                    <strong>Họ:</strong> {account.FirstName}
                  </p>
                  <p>
                    <strong>Tên:</strong> {account.LastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {account.Email}
                  </p>
                  <p>
                    <strong>Vai trò:</strong> {account.Role}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {account.Status ? "Hoạt động" : "Không hoạt động"}
                  </p>
                  <p>
                    <strong>Mô tả:</strong> {account.Bio}
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    <strong>Ngày cập nhật:</strong>{" "}
                    {new Date(account.updatedAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-secondary m-t-3 float-left"
                    onClick={handleBack}
                  >
                    Quay về
                  </button>
                  {/* Nút thay đổi vai trò */}
                  <button
                    className="btn btn-primary m-l-10"
                    onClick={handleChangeRole}
                  >
                    Thay đổi vai trò
                  </button>
                  {/* Nút thay đổi trạng thái */}
                  <button
                    className="btn btn-warning m-l-10"
                    onClick={handleToggleStatus}
                  >
                    {account.Status ? "Vô hiệu hóa" : "Kích hoạt"}
                  </button>
                  <button
                    className="btn btn-success m-l-10"
                    onClick={handleShowResetPasswordModal}
                  >
                    Đặt lại mật khẩu
                  </button>
                  <button
                    className="btn btn-danger float-right"
                    onClick={handleShowDeleteModal}
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thay đổi vai trò */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thay đổi vai trò</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="form-control"
                >
                  <option value="Admin">Quản trị viên</option>
                  <option value="Content Writer">Tác Giả</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateRole}
                >
                  Cập nhật vai trò
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận trạng thái */}
      {showStatusModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {statusAction === "activate"
                    ? "Kích hoạt tài khoản"
                    : "Vô hiệu hóa tài khoản"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseStatusModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Bạn có chắc chắn muốn{" "}
                  {statusAction === "activate" ? "kích hoạt" : "vô hiệu hóa"}{" "}
                  tài khoản này không?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseStatusModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateStatus}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Đặt lại Mật khẩu */}
      {showResetPasswordModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Đặt lại mật khẩu</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseResetPasswordModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Bạn có chắc chắn muốn đặt lại mật khẩu tài khoản này về{" "}
                  <strong>123456789</strong> không?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseResetPasswordModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleResetPassword}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa tài khoản */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xóa tài khoản</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseDeleteModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminSideNav />

      <ToastContainer />
    </div>
  );
};

export default AccountDetail;
