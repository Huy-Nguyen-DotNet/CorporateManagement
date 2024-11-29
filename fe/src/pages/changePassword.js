import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideNav from "../components/AdminSideNav";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    // Kiểm tra độ dài mật khẩu mới (có thể chỉnh sửa tùy theo yêu cầu)
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    // Xóa thông báo lỗi trước khi gửi yêu cầu mới
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      // Gửi yêu cầu thay đổi mật khẩu đến API backend
      const response = await fetch(
        "http://localhost:5000/api/accounts/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Lấy token từ localStorage
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Mật khẩu đã được thay đổi thành công!"); // Hiển thị thông báo thành công từ API
      } else {
        setError(data.message || "Đã xảy ra lỗi khi thay đổi mật khẩu."); // Hiển thị thông báo lỗi
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi thay đổi mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        <div className="main-content">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Thay Đổi Mật Khẩu</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label
                      className="font-weight-semibold"
                      htmlFor="oldPassword"
                    >
                      Mật khẩu cũ:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      placeholder="Mật khẩu cũ"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label
                      className="font-weight-semibold"
                      htmlFor="newPassword"
                    >
                      Mật khẩu mới:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label
                      className="font-weight-semibold"
                      htmlFor="confirmPassword"
                    >
                      Xác nhận mật khẩu mới:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Xác nhận mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <button
                      type="submit"
                      className="btn btn-primary m-t-30"
                      disabled={loading}
                    >
                      {loading ? "Đang thay đổi..." : "Thay đổi"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Hiển thị thông báo lỗi hoặc thành công */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && (
                <div className="alert alert-success mt-3">{success}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
    </div>
  );
};

export default ChangePassword;
