import React from 'react';

const WidgetAbout = () => {
  return (
    <div className="widget rounded">
      <div
        className="widget-about data-bg-image text-center"
        style={{ backgroundImage: 'url(images/map-bg.png)' }}
      >
        <img src="images/logo-fold.png" alt="logo" className="mb-4" />
        <p className="mb-4">
        Tôi là một Content Writer với kinh nghiệm viết nội dung sáng tạo, tối ưu hóa SEO, và xây dựng chiến lược truyền thông phù hợp để thu hút và tương tác với khách hàng mục tiêu.
        </p>
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
      </div>
    </div>
  );
};

export default WidgetAbout;
