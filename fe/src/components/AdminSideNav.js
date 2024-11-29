import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Dùng để giải mã token

import "../assets/css/adminCss/AdminSideNav.css";

const AdminSideNav = () => {
  const navigate = useNavigate();

  // Lấy token từ localStorage hoặc sessionStorage
  const token = localStorage.getItem("token"); // Hoặc sessionStorage
  let role = null;

  if (token) {
    const decodedToken = jwtDecode(token); // Giải mã token
    role = decodedToken.role; // Lấy thông tin role
  }

  // Hàm điều hướng
  const handleClickCategory = () => {
    navigate("/admin-category");
  };
  const handleClickTag = () => {
    navigate("/admin-tag");
  };
  const handleClickAccount = () => {
    navigate("/admin-account");
  };
  const handleClickNew = () => {
    navigate("/admin-new");
  };
  return (
    <div className="side-nav">
      <div className="side-nav-inner">
        <ul className="side-nav-menu scrollable">
          <li className="nav-item dropdown">
            <a>
              <span className="icon-holder">
                <i className="fas fa-home"></i>
              </span>
              <span className="title">Trang Chủ</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a>
              <span className="icon-holder">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </span>
              <span className="title" onClick={handleClickCategory}>
                Quản Lý Danh Mục
              </span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a>
              <span className="icon-holder">
                <i className="fa fa-tags" aria-hidden="true"></i>
              </span>
              <span className="title" onClick={handleClickTag}>
                Quản Lý Thẻ
              </span>
            </a>
          </li>

          {/* Hiển thị "Quản Lý Bài Viết" với mọi vai trò */}
          <li className="nav-item dropdown">
            <a>
              <span className="icon-holder">
                <i className="far fa-newspaper"></i>
              </span>
              <span className="title" onClick={handleClickNew}>
                Quản Lý Bài Viết
              </span>
            </a>
          </li>

          {/* Chỉ hiển thị nếu role không phải là "Content Writer" */}
          {role !== "Content Writer" && (
            <>
              <li className="nav-item dropdown">
                <a>
                  <span className="icon-holder">
                    <i className="fas fa-user-cog"></i>
                  </span>
                  <span className="title" onClick={handleClickAccount}>
                    Quản Lý Người Dùng
                  </span>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNav;
