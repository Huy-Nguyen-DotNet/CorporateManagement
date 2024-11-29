import React, { useState, useEffect } from "react";
import DataTable from "../../components/dataTables.js";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/Breadcrumb";
import { jwtDecode } from "jwt-decode";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State cho modal
  const [newCategory, setNewCategory] = useState({
    Name: "",
    Status: true,
    Summary: "",
    Url: "",
    MetaTitle: "",
    MetaKeyword: "",
    MetaDescription: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Danh Mục", link: "" },
  ];

  const columns = [
    { key: "name", label: "Tên Danh mục" },
    { key: "status", label: "Trạng thái" },
    { key: "createdAt", label: "Ngày Tạo" },
    { key: "updatedAt", label: "Ngày Sửa Đổi" },
    { key: "createdBy", label: "Người Tạo" },
  ];

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, {
        autoClose: 10000,
      });
    }
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.map((category) => {
            return fetch(
              `http://localhost:5000/api/accounts/${category.CreatedBy}`
            )
              .then((response) => response.json())
              .then((accountData) => {
                category.createdBy =
                  accountData.FirstName + " " + accountData.LastName;
                return category;
              });
          })
        ).then((updatedCategories) => {
          const transformedData = updatedCategories.map((category) => ({
            id: category._id,
            name: category.Name,
            status: category.Status ? "Hoạt động" : "Không hoạt động",
            createdAt: new Date(category.createdAt).toLocaleDateString("vi-VN"),
            updatedAt: new Date(category.updatedAt).toLocaleDateString("vi-VN"),
            createdBy: category.createdBy,
            url: category.Url,
            summary: category.Summary,
            position: category.Position,
            metaTitle: category.MetaTitle,
            metaKeyword: category.MetaKeyword,
            metaDescription: category.MetaDescription,
          }));
          setCategories(transformedData);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
        setLoading(false);
      });
  };

  const handleRowDoubleClick = (rowData) => {
    navigate(`/admin-category/${rowData.id}`);
  };

  const handleCloseModal = () => {
    // Đóng modal
    setShowModal(false);

    // Reload lại trang
    window.location.reload();
  };
  const handleShowModal = () => setShowModal(true); // Mở modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleSubmitCategory = async () => {
    let token = localStorage.getItem("token"); // Lấy Access Token từ localStorage

    const isTokenExpired = (token) => {
      if (!token) return true; // Nếu không có token, coi như đã hết hạn
    };

    // Kiểm tra token có hết hạn không
    if (isTokenExpired(token)) {
      // Nếu hết hạn, gọi API refresh để lấy token mới
      const refreshResponse = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        token = data.accessToken; // Cập nhật Access Token mới
        localStorage.setItem("token", token); // Lưu lại Access Token
      } else {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        return; // Dừng việc xử lý
      }
    }

    // Tiếp tục gửi yêu cầu thêm danh mục
    fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          toast.success("Thêm danh mục thành công");
          setShowModal(false);
        } else {
          toast.error("Lỗi khi thêm danh mục");
        }
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra: " + error.message);
      });
  };

  if (loading) {
    return (
      <div>
        <AdminHeader />
        <div>Đang tải dữ liệu...</div>
        <AdminSideNav />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        <div className="main-content">
          <div className="tab-content m-t-15">
            <div className="tab-pane fade show active" id="tab-account">
              <Breadcrumb categories={level} />
              <h2>Quản Lý Danh Mục</h2>
              <Button
                variant="primary"
                onClick={handleShowModal}
                className="float-right"
              >
                Thêm Danh Mục
              </Button>
              <DataTable
                key="categoryTable"
                columns={columns}
                data={categories}
                onRowDoubleClick={handleRowDoubleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
      {/* Modal Thêm Danh Mục */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Danh Mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Tên Danh Mục</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={newCategory.Name}
                onChange={handleInputChange}
                placeholder="Nhập tên danh mục"
              />
            </Form.Group>

            <Form.Group controlId="formCategorySummary">
              <Form.Label>Tóm Tắt</Form.Label>
              <Form.Control
                type="text"
                name="Summary"
                value={newCategory.Summary}
                onChange={handleInputChange}
                placeholder="Nhập tóm tắt"
              />
            </Form.Group>

            <Form.Group controlId="formCategoryMetaTitle">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="Url"
                value={newCategory.Url}
                onChange={handleInputChange}
                placeholder="Nhập Meta Title"
              />
            </Form.Group>

            <Form.Group controlId="formCategoryMetaTitle">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control
                type="text"
                name="MetaTitle"
                value={newCategory.MetaTitle}
                onChange={handleInputChange}
                placeholder="Nhập Meta Title"
              />
            </Form.Group>

            <Form.Group controlId="formCategoryMetaKeyword">
              <Form.Label>Meta Keyword</Form.Label>
              <Form.Control
                type="text"
                name="MetaKeyword"
                value={newCategory.MetaKeyword}
                onChange={handleInputChange}
                placeholder="Nhập Meta Keyword"
              />
            </Form.Group>

            <Form.Group controlId="formCategoryMetaDescription">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                type="text"
                name="MetaDescription"
                value={newCategory.MetaDescription}
                onChange={handleInputChange}
                placeholder="Nhập Meta Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmitCategory}>
            Thêm Danh Mục
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Category;
