import React from 'react';
import '../assets/css/adminCss/AdminSideNav.css'


const AdminSideNav = () => {
  return (
    <div className="side-nav">
      <div className="side-nav-inner">
        <ul className="side-nav-menu scrollable">
          <li className="nav-item dropdown active">
              <a>
              <span className="icon-holder">
                <i className="fas fa-home"></i>
              </span>
              <span className="title">Trang Chủ</span>
              </a>
          </li>
          <li className="nav-item dropdown">
            <a><span className="icon-holder">
            <i class="fa fa-bars" aria-hidden="true"></i>
              </span>
              <span className="title">Quản Lý Danh Mục</span>
            </a>
          </li>
          <li className="nav-item dropdown">
              <a>
              <span className="icon-holder">
                <i className="far fa-newspaper"></i>
              </span>
              <span className="title">Quản Lý Bài Viết</span>
              </a>
          </li>
          <li className="nav-item dropdown">
              <a>
              <span className="icon-holder">
                <i className="fas fa-comment-dots"></i>
              </span>
              <span className="title">Quản Lý Bình Luận</span>
              </a>
          </li>
          <li className="nav-item dropdown">
              <a>
              <span className="icon-holder">
                <i className="fas fa-user-cog"></i>
              </span>
              <span className="title">Quản Lý Người Dùng</span>
              </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNav;
