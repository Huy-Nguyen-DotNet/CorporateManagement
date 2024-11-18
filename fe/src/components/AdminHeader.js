import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logoVLU-1.png";
import avatar from "../assets/images/avatars/mHuy.jpg";
import "../assets/css/adminCss/AdminHeader.css";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      {/* Logo */}
      <div className="logo">
        <a>
          <img src={logo} alt="Logo" />
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
        <ul className="nav-right float-right">
          <div className="m-l-10">
            <p className="m-b-0 text-dark font-weight-semibold">
              Nguyễn Minh Huy
            </p>
            <p className="m-b-0 opacity-07">.NET Developer</p>
          </div>
          <li
            className="dropdown dropdown-animated scale-left"
            ref={dropdownRef}
          >
            <div className="pointer" onClick={toggleDropdown}>
              <div className="avatar avatar-image m-h-10 m-r-15">
                <img src={avatar} alt="avatar" />
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
                    <img src={avatar} alt="avatar" />
                  </div>
                  <div className="m-l-10">
                    <p className="m-b-0 text-dark font-weight-semibold">
                      Nguyễn Minh Huy
                    </p>
                    <p className="m-b-0 opacity-07">.NET Developer</p>
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
                      class="icon-settings font-size-16"
                      aria-hidden="true"
                    ></i>
                    <span className="m-l-10 font-weight-bold">
                      Chỉnh Sửa Thông Tin
                    </span>
                  </div>
                  <i className="icon-action-redo font-size-10 "></i>
                </div>
              </a>
              <a
                href="javascript:void(0);"
                className="dropdown-item d-block p-h-15 p-v-10"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <i class="icon-lock font-size-16" aria-hidden="true"></i>
                    <span className="m-l-10 font-weight-bold">
                      Đổi Mật Khẩu
                    </span>
                  </div>
                  <i className="icon-action-redo font-size-10"></i>
                </div>
              </a>
              <a
                href="javascript:void(0);"
                className="dropdown-item d-block p-h-15 p-v-10"
                onClick={() => (window.location.href = "login.html")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <i class="icon-logout font-size-16" aria-hidden="true"></i>
                    <span className="m-l-10 font-weight-bold">Đăng Xuất</span>
                  </div>
                  <i className="icon-action-redo font-size-10"></i>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
