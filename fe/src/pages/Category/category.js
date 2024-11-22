import React, { useState, useEffect } from "react";
import DataTable from "../../components/dataTables.js";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";

const Catagory = () => {
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

  const columns = [
    { key: "name", label: "Tên Danh mục" },
    { key: "status", label: "Trạng thái" },
    { key: "createdAt", label: "Ngày Tạo" },
    { key: "createdBy", label: "Người Tạo" },
  ];

  useEffect(() => {
    // Sử dụng fetch để gọi API lấy danh sách danh mục từ backend
    fetch("http://localhost:5000/api/categories") // URL API backend
      .then((response) => response.json()) // Chuyển dữ liệu thành JSON
      .then((data) => {
        // Xử lý mỗi danh mục và lấy thông tin người tạo (CreatedBy) từ _id
        Promise.all(
          data.map((category) => {
            return fetch(
              `http://localhost:5000/api/accounts/${category.CreatedBy}`
            ) // Gọi API để lấy thông tin người tạo
              .then((response) => response.json())
              .then((accountData) => {
                // Cập nhật với tên người tạo
                category.createdBy = accountData.Username; // Giả sử API trả về 'name' của người tạo
                return category; // Trả lại category đã được cập nhật
              });
          })
        )
          .then((updatedCategories) => {
            // Cập nhật danh sách danh mục với thông tin người tạo đã được lấy
            const transformedData = updatedCategories.map((category) => ({
              name: category.Name,
              status: category.Status ? "Hoạt động" : "Không hoạt động",
              createdAt: new Date(category.createdAt).toLocaleDateString(
                "vi-VN"
              ),
              createdBy: category.createdBy, // Hiển thị tên người tạo
            }));
            setCategories(transformedData); // Cập nhật state với dữ liệu đã xử lý
            setLoading(false); // Đổi trạng thái loading khi dữ liệu đã được tải xong
          })
          .catch((error) => {
            console.error(
              "Có lỗi khi lấy dữ liệu danh mục hoặc thông tin người tạo:",
              error
            );
            setLoading(false); // Đổi trạng thái loading khi có lỗi
          });
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu danh mục:", error);
        setLoading(false); // Đổi trạng thái loading khi có lỗi
      });
  }, []); // Chạy 1 lần khi component được render lần đầu

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo khi dữ liệu đang tải
  }

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        {/* Content Wrapper START */}
        <div className="main-content">
          <div className="row">
            <div className="col-md-6">
              <h2>Quản Lý Danh Mục</h2>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end ">
              <button
                className="btn btn-primary m-r-5 background-color-blue float-right"
                style={{ color: "black" }}
                id="createCustomer"
              >
                Thêm Mới Danh Mục
              </button>
              <button className="btn btn-danger m-r-5 float-right">
                Xóa Danh Mục
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <DataTable columns={columns} data={categories} />
            </div>
            <div className="col-md-4 m-t-70">
              <form>
                <div className="form-group">
                  <label>ID Danh Mục</label>
                  <input type="text" className="form-control" name="id" />
                </div>
                <div className="form-group">
                  <label>Tên Danh Mục</label>
                  <input type="text" className="form-control" name="name" />
                </div>
                <div className="form-group">
                  <label>Mô Tả</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Ngày Tạo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="createdDate"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Người Tạo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="createdBy"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Ngày Chỉnh Sửa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modifiedDate"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Người Chỉnh sửa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modifiedBy"
                    />
                  </div>
                </div>
                <fieldset className="form-group">
                  <div className="row">
                    <label className="col-form-label col-sm-4 pt-0">
                      Trạng thái
                    </label>
                    <div className="col-sm-8">
                      <div className="radio">
                        <input
                          type="radio"
                          name="status"
                          id="gridRadios1"
                          value="active"
                        />
                        <label htmlFor="gridRadios1">Hoạt động</label>
                      </div>
                      <div className="radio">
                        <input
                          type="radio"
                          name="status"
                          id="gridRadios2"
                          value="inactive"
                        />
                        <label htmlFor="gridRadios2">Không hoạt động</label>
                      </div>
                      <div className="radio">
                        <input
                          type="radio"
                          name="status"
                          id="gridRadios3"
                          value="hidden"
                        />
                        <label htmlFor="gridRadios3">Ẩn</label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
    </div>
  );
};

export default Catagory;
