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

const Tag = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State cho modal
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState({
    Name: "",
    Status: true,
    Url: "",
    MetaTitle: "",
    MetaKeyword: "",
    MetaDescription: "",
  });

  const columns = [
    { key: "name", label: "Tên Thẻ" },
    { key: "status", label: "Trạng thái" },
    { key: "createdAt", label: "Ngày Tạo" },
    { key: "updatedAt", label: "Ngày Sửa Đổi" },
    { key: "createdBy", label: "Người Tạo" },
  ];

  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Thẻ", link: "" },
  ];

  const handleCloseModal = () => {
    // Đóng modal
    setShowModal(false);

    // Reload lại trang
    window.location.reload();
  };
  const handleShowModal = () => setShowModal(true); // Mở modal

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, {
        autoClose: 10000,
      });
    }
    fetchTags();
  }, []);

  const fetchTags = () => {
    fetch("http://localhost:5000/api/tags")
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.map((tag) => {
            return fetch(`http://localhost:5000/api/accounts/${tag.CreatedBy}`)
              .then((response) => response.json())
              .then((accountData) => {
                tag.createdBy =
                  accountData.FirstName + " " + accountData.LastName;
                return tag;
              });
          })
        ).then((updatedTags) => {
          const transformedData = updatedTags.map((tag) => ({
            id: tag._id,
            name: tag.Name,
            status: tag.Status ? "Hoạt động" : "Không hoạt động",
            createdAt: new Date(tag.createdAt).toLocaleDateString("vi-VN"),
            updatedAt: new Date(tag.updatedAt).toLocaleDateString("vi-VN"),
            createdBy: tag.createdBy,
            url: tag.Url,
            metaTitle: tag.MetaTitle,
            metaKeyword: tag.MetaKeyword,
            metaDescription: tag.MetaDescription,
          }));
          setTags(transformedData);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag({
      ...newTag,
      [name]: value,
    });
  };

  const handleSubmitTag = () => {
    const token = localStorage.getItem("token"); // Hoặc nơi bạn lưu token

    fetch("http://localhost:5000/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Đảm bảo token được gửi
      },
      body: JSON.stringify(newTag),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data._id) {
          toast.success("Thêm thẻ mới thành công");
          // Làm mới trang sau khi thêm thành công
          window.location.reload();
        } else {
          toast.error("Lỗi khi thêm thẻ");
        }
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra: " + error.message);
      });
  };

  const handleRowDoubleClick = (rowData) => {
    navigate(`/admin-tag/${rowData.id}`);
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
              <h2>Quản Lý Thẻ</h2>
              <Button
                variant="primary"
                onClick={handleShowModal}
                className="float-right"
              >
                Thêm Thẻ Mới
              </Button>
              <DataTable
                key="tagTable"
                columns={columns}
                data={tags}
                onRowDoubleClick={handleRowDoubleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Thẻ Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTagName">
              <Form.Label>Tên Thẻ</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={newTag.Name}
                onChange={handleInputChange}
                placeholder="Nhập tên thẻ"
              />
            </Form.Group>

            <Form.Group controlId="formTagMetaTitle">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="Url"
                value={newTag.Url}
                onChange={handleInputChange}
                placeholder="Nhập Meta Title"
              />
            </Form.Group>

            <Form.Group controlId="formTagMetaTitle">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control
                type="text"
                name="MetaTitle"
                value={newTag.MetaTitle}
                onChange={handleInputChange}
                placeholder="Nhập Meta Title"
              />
            </Form.Group>

            <Form.Group controlId="formTagMetaKeyword">
              <Form.Label>Meta Keyword</Form.Label>
              <Form.Control
                type="text"
                name="MetaKeyword"
                value={newTag.MetaKeyword}
                onChange={handleInputChange}
                placeholder="Nhập Meta Keyword"
              />
            </Form.Group>

            <Form.Group controlId="formTagMetaDescription">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                type="text"
                name="MetaDescription"
                value={newTag.MetaDescription}
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
          <Button variant="primary" onClick={handleSubmitTag}>
            Thêm Danh Mục
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Tag;
