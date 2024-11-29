import React, { useState, useEffect } from "react";

const WidgetCategories = () => {
  // State để lưu danh sách các thể loại
  const [categories, setCategories] = useState([]);

  // useEffect để gọi API khi component được render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories"); // Thay đổi URL API nếu cần

        if (response.ok) {
          const data = await response.json();

          // Giả sử dữ liệu trả về có cấu trúc như { name: string, count: number }
          setCategories(data); // Cập nhật danh sách thể loại vào state
        } else {
          console.error("Lỗi khi lấy dữ liệu từ API");
        }
      } catch (error) {
        console.error("Có lỗi khi kết nối API:", error);
      }
    };

    fetchCategories(); // Gọi hàm fetchCategories khi component được render
  }, []);

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Danh Mục</h3>
      </div>
      <div className="widget-content">
        <ul className="list">
          {/* Kiểm tra nếu có danh sách thể loại và hiển thị */}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <a href={`/category/${category._id}`}>{category.Name}</a>
              </li>
            ))
          ) : (
            <li>Đang tải danh mục...</li> // Nếu không có dữ liệu, hiển thị thông báo
          )}
        </ul>
      </div>
    </div>
  );
};

export default WidgetCategories;
