import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideNav from "../components/AdminSideNav";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  // Lấy thông tin người dùng từ API khi component được render
  useEffect(() => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (!token) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    // Gọi API để lấy thông tin người dùng
    fetch("http://localhost:5000/api/accounts/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Điền dữ liệu vào các state
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setEmail(data.Email);
        setRole(data.Role);
        setBio(data.Bio);
        setAvatar(data.Avatar);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
        setCreatedBy(data.createdBy || "Admin"); // Giả sử 'createdBy' được trả về từ API, nếu không có thì mặc định là "Admin"
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError("Không thể tải thông tin tài khoản. Vui lòng thử lại sau.");
      });
  }, [navigate]);

  // Hàm xử lý khi thay đổi thông tin trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "role":
        setRole(value);
        break;
      case "avatar":
        setAvatar(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Tạo FormData
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("Bio", bio);
    formData.append("Role", role);

    // Nếu có ảnh, gửi cùng với FormData
    if (avatar) {
      formData.append("Avatar", avatar); // Chắc chắn rằng trường này là "Avatar"
    }

    // Gửi lên API
    fetch("http://localhost:5000/api/accounts/edit-profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Sử dụng FormData thay vì JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updated:", data);
        setSuccessMessage("Cập nhật thông tin thành công!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("Cập nhật thất bại. Vui lòng thử lại.");
      });
  };

  // Chuyển hướng đến trang đổi mật khẩu
  const handleClickChangePassword = () => {
    navigate("/admin-change-password");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        {/* Content Wrapper START */}
        <div className="main-content">
          <div className="tab-content m-t-15">
            <div className="tab-pane fade show active" id="tab-account">
              {/* Thông tin cơ bản */}
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Thông tin cơ bản</h4>
                </div>
                <div className="card-body">
                  {/* Phần Ảnh Đại Diện */}
                  <div
                    className="media align-items-center justify-content-center"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="avatar avatar-image m-h-10 m-r-15"
                      style={{ height: "80px", width: "80px" }}
                    >
                      {/* Nếu avatar có giá trị, sử dụng avatar đó, nếu không thì sử dụng ảnh mặc định */}
                      <img
                        src={
                          avatar
                            ? `http://localhost:5000/${avatar}`
                            : "default-avatar.jpg"
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className="m-l-20 m-r-20">
                      <h5 className="m-b-5 font-size-18"></h5>
                      <p className="opacity-07 font-size-13 m-b-0"></p>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                        id="avatarUpload"
                      />
                      <button
                        className="btn btn-tone btn-primary"
                        onClick={() =>
                          document.getElementById("avatarUpload").click()
                        }
                      >
                        Tải lên
                      </button>
                    </div>
                  </div>

                  <hr className="m-v-25" />
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      {/* Họ */}
                      <div className="form-group col-md-6">
                        <label
                          className="font-weight-semibold"
                          htmlFor="firstName"
                        >
                          Họ:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={handleInputChange}
                          placeholder="Nhập họ"
                        />
                      </div>
                      {/* Tên */}
                      <div className="form-group col-md-6">
                        <label
                          className="font-weight-semibold"
                          htmlFor="lastName"
                        >
                          Tên:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={handleInputChange}
                          placeholder="Nhập tên"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      {/* Email */}
                      <div className="form-group col-md-6">
                        <label className="font-weight-semibold" htmlFor="email">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                          placeholder="Nhập email"
                        />
                      </div>
                      {/* Vai trò */}
                      <div className="form-group col-md-6">
                        <label className="font-weight-semibold" htmlFor="role">
                          Vai trò:
                        </label>
                        <select
                          className="form-control"
                          id="role"
                          name="role"
                          value={role} // Giá trị của combobox sẽ được liên kết với state `role`
                          onChange={handleInputChange} // Hàm xử lý sự kiện thay đổi
                        >
                          <option value="Admin">Admin</option>
                          <option value="Content Writer">Content Writer</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      {/* Bio */}
                      <div className="form-group col-md-12">
                        <label className="font-weight-semibold" htmlFor="bio">
                          Giới thiệu:
                        </label>
                        <textarea
                          className="form-control"
                          id="bio"
                          name="bio"
                          rows="3"
                          value={bio}
                          onChange={handleInputChange}
                          placeholder="Giới thiệu về bạn"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      {/* Ngày tạo */}
                      <div className="form-group col-md-6">
                        <label
                          className="font-weight-semibold"
                          htmlFor="createdAt"
                        >
                          Ngày tạo tài khoản:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="createdAt"
                          name="createdAt"
                          value={new Date(createdAt).toLocaleString()}
                          readOnly
                        />
                      </div>
                      {/* Người tạo */}
                      <div className="form-group col-md-6">
                        <label
                          className="font-weight-semibold"
                          htmlFor="createdBy"
                        >
                          Ngày sửa:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="updatedAt"
                          name="updatedAt"
                          value={new Date(updatedAt).toLocaleString()}
                          readOnly
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Cập nhật thông tin
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Wrapper END */}
      </div>
      <AdminSideNav />
    </div>
  );
};

export default EditProfile;
