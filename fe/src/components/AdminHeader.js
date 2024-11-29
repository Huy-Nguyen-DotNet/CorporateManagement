import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/images/logoVLU-1.png";
import "../assets/css/adminCss/AdminHeader.css";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Khởi tạo state cho user
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Hàm để toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Hàm đóng dropdown khi click ngoài
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Hàm logout
  const handleLogout = () => {
    // Xóa token và user khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  // useEffect để kiểm tra dữ liệu người dùng khi component mount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData); // Parse dữ liệu
        setUser(parsedUserData); // Lưu thông tin người dùng vào state
        console.log(parsedUserData);
      } catch (error) {
        console.error("Không thể parse dữ liệu người dùng:", error);
        navigate("/admin-login"); // Điều hướng nếu dữ liệu không hợp lệ
      }
    } else {
      navigate("/admin-login"); // Điều hướng nếu không có thông tin người dùng
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navigate]);

  const handleClickEdit = () => {
    navigate("/admin-edit-profile"); // Chuyển hướng đến trang chỉnh sửa
  };

  const handleClickChangePassword = () => {
    navigate("/admin-change-password"); // Chuyển hướng đến trang chỉnh sửa
  };

  const handleClickHome = () => {
    navigate("/home");
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="logo">
        <a>
          <img src={logo} alt="Logo" onClick={handleClickHome} />
        </a>
      </div>

      {/* Navigation */}
      <div className="nav-wrap">
        <ul className="nav-left">
          <li className="mobile-toggle">
            <a href="javascript:void(0);">
              <i className="anticon"></i>
            </a>
          </li>
        </ul>

        {user ? (
          <ul className="nav-right float-right">
            <div className="m-l-10">
              <p className="m-b-0 text-dark font-weight-semibold">
                {user.firstname} {user.lastname}
              </p>
              <p className="m-b-0 opacity-07">{user.role}</p>
            </div>
            <li
              className="dropdown dropdown-animated scale-left"
              ref={dropdownRef}
            >
              <div className="pointer" onClick={toggleDropdown}>
                <div className="avatar avatar-image m-h-10 m-r-15">
                  <img
                    src={
                      user && user.avatar
                        ? `http://localhost:5000/${user.avatar}`
                        : "default-avatar.jpg"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div
                className={`p-b-15 p-t-20 dropdown-menu pop-profile ${
                  isDropdownOpen ? "show" : ""
                }`}
              >
                <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                  <div className="d-flex m-r-50">
                    <div className="avatar avatar-lg avatar-image">
                      <img
                        src={
                          user && user.avatar
                            ? `http://localhost:5000/${user.avatar}`
                            : "default-avatar.jpg"
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className="m-l-10">
                      <p className="m-b-0 text-dark font-weight-semibold">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="m-b-0 opacity-07">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                <a
                  href="javascript:void(0);"
                  className="dropdown-item d-block p-h-15 p-v-10"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <i
                        className="icon-settings font-size-16"
                        aria-hidden="true"
                      ></i>
                      <span
                        className="m-l-10 font-weight-bold"
                        onClick={handleClickEdit}
                      >
                        Chỉnh Sửa Thông Tin
                      </span>
                    </div>
                    <i className="icon-action-redo font-size-10"></i>
                  </div>
                </a>
                <a
                  href="javascript:void(0);"
                  className="dropdown-item d-block p-h-15 p-v-10"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <i
                        className="icon-lock font-size-16"
                        aria-hidden="true"
                      ></i>
                      <span
                        className="m-l-10 font-weight-bold"
                        onClick={handleClickChangePassword}
                      >
                        Đổi Mật Khẩu
                      </span>
                    </div>
                    <i className="icon-action-redo font-size-10"></i>
                  </div>
                </a>
                <a
                  href="javascript:void(0);"
                  className="dropdown-item d-block p-h-15 p-v-10"
                  onClick={handleLogout}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <i
                        className="icon-logout font-size-16"
                        aria-hidden="true"
                      ></i>
                      <span className="m-l-10 font-weight-bold">Đăng Xuất</span>
                    </div>
                    <i className="icon-action-redo font-size-10"></i>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        ) : (
          <p>Đang tải thông tin người dùng...</p>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
