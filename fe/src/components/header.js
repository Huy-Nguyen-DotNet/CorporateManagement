import React from "react";
import logo from "../assets/images/logo-fold.png";
import "../assets/css/componentsCSS/header.css";
import { Link } from "react-router-dom";
import AdminHome from "../pages/adminHome";

const Header = () => {
  return (
    <header className="header-default">
      <nav className="navbar navbar-expand-lg">
        <div className="container-xl">
          {/* site logo */}
          <a className="navbar-brand" href="index.html">
            <img src={logo} alt="logo" />
          </a>

          <div className="collapse navbar-collapse">
            {/* menus */}
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="category.html">
                  Trang Chủ
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#">
                  Danh Mục Tin Tức
                </a>
                <ul className="dropdown-menu multi-column">
                  <li>
                    <a className="dropdown-item" href="politics.html">
                      Chính Trị
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="business.html">
                      Kinh Doanh
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="technology.html">
                      Công Nghệ
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="sports.html">
                      Thể Thao
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="health.html">
                      Sức Khỏe
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="education.html">
                      Giáo Dục
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="entertainment.html">
                      Giải Trí
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="travel.html">
                      Du Lịch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="science.html">
                      Khoa Học
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="lifestyle.html">
                      Đời Sống
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Liên Hệ
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-home">
                  Quản Trị Viên
                </Link>
              </li>
            </ul>
          </div>

          {/* header right section */}
          <div className="header-right">
            {/* social icons */}
            <ul className="social-icons list-unstyled list-inline mb-0">
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
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-pinterest"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-medium"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
            {/* header buttons */}
            <div className="header-buttons">
              <button className="search icon-button">
                <i className="icon-magnifier"></i>
              </button>
              <button className="burger-menu icon-button">
                <span className="burger-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
