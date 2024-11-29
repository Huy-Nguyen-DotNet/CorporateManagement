import React, { useState, useEffect } from "react";

const WidgetTags = () => {
  // State để lưu trữ danh sách tags
  const [tags, setTags] = useState([]);

  // useEffect để gọi API khi component được render
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tags");

        // Kiểm tra nếu response trả về OK
        if (response.ok) {
          const data = await response.json(); // Parse dữ liệu JSON

          // Lọc chỉ lấy trường Name từ mỗi đối tượng
          const tagNames = data.map((tag) => tag.Name);

          setTags(tagNames); // Cập nhật state tags với dữ liệu đã lọc
        } else {
          console.error("Lỗi khi lấy dữ liệu từ API");
        }
      } catch (error) {
        console.error("Có lỗi khi kết nối API:", error);
      }
    };

    fetchTags(); // Gọi hàm fetchTags
  }, []); // Chạy một lần khi component được render

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title font-weight-bold">Thẻ</h3>
      </div>
      <div className="widget-content">
        {/* Kiểm tra nếu tags có dữ liệu và hiển thị */}
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <a key={index} href="#" className="tag">
              {tag}
            </a>
          ))
        ) : (
          <p>Đang tải dữ liệu...</p> // Nếu không có dữ liệu, hiển thị thông báo
        )}
      </div>
    </div>
  );
};

export default WidgetTags;
