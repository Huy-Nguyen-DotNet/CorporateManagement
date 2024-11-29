import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo-fold.png";
import "../assets/css/componentsCSS/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu giá trị tìm kiếm

  // Fetch danh mục từ API khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data); // Lưu trữ danh mục vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Hàm xử lý thay đổi input tìm kiếm
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Hàm xử lý submit tìm kiếm
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Bạn có thể thay đổi URL hoặc thực hiện tìm kiếm ở đây
      window.location.href = `/search/${searchQuery}`; // Điều hướng tới trang tìm kiếm
    }
  };

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
                <a className="nav-link font-weight-bold" href="/home">
                  Trang Chủ
                </a>
              </li>
              <li className="nav-item dropdown m-l-35">
                <a className="nav-link dropdown-toggle font-weight-bold">
                  Danh Mục Tin Tức
                </a>
                <ul className="dropdown-menu multi-column">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <a
                        className="dropdown-item"
                        href={`/category/${category._id}`}
                      >
                        {category.Name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item m-l-35">
                <a className="nav-link font-weight-bold" href="/admin-home">
                  Quản Trị Viên
                </a>
              </li>
            </ul>
          </div>

          {/* header right section */}
          <div className="header-right m-t">
            {/* header buttons */}
            <div className="header-buttons">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={handleSearchChange} // Cập nhật giá trị tìm kiếm
                />
                <button type="submit" className="search icon-button">
                  <i className="icon-magnifier"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
