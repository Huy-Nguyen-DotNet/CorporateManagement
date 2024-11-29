import { useEffect, useState } from "react";
import React from "react";
import Switch from "react-switch";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form, Row, Col, Modal } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import "../../assets/css/adminCss/categoryDetail.css"; // Thêm CSS tùy chỉnh
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS của Toastify
import Breadcrumb from "../../components/Breadcrumb";

const TagDetail = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isStatusActive, setIsStatusActive] = useState(false); // Trạng thái switch
  const navigate = useNavigate();
  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Thẻ", link: "/admin-tag" },
    { name: "Chi Tiết Thẻ", link: "" }, // Không có link cho cấp cuối cùng
  ];

  // Hàm quay lại trang trước
  const handleBack = () => {
    navigate(-1);
  };

  // Hàm thay đổi giá trị các trường
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTag((prevTag) => ({
      ...prevTag,
      [name]: value,
    }));
  };

  const handleStatusChange = (checked) => {
    setIsStatusActive(checked);
    setTag((prevTag) => ({
      ...prevTag,
      status: checked ? "Hoạt động" : "Không hoạt động",
    }));
  };

  useEffect(() => {
    const fetchTagDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tags/${id}`);
        const data = await response.json();

        const accountResponse = await fetch(
          `http://localhost:5000/api/accounts/${data.CreatedBy}`
        );
        const accountData = await accountResponse.json();

        // Gắn thêm thông tin người tạo vào dữ liệu danh mục
        data.createdBy = `${accountData.FirstName} ${accountData.LastName}`;
        setTag({
          id: data._id,
          name: data.Name,
          status: data.Status ? "Hoạt động" : "Không hoạt động",
          createdAt: new Date(data.createdAt).toLocaleDateString("vi-VN"),
          updatedAt: new Date(data.updatedAt).toLocaleDateString("vi-VN"),
          createdBy: data.createdBy,
          url: data.Url,
          metaTitle: data.MetaTitle,
          metaKeyword: data.MetaKeyword,
          metaDescription: data.MetaDescription,
        });
        setIsStatusActive(data.Status); // Cập nhật trạng thái cho switch
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết danh mục:", error);
      }
    };

    fetchTagDetail();
  }, [id]);

  // Kiểm tra nếu dữ liệu danh mục chưa có
  if (!tag) return <div>Đang tải chi tiết danh mục...</div>;

  // Hàm gửi yêu cầu PUT để cập nhật danh mục
  const handleSave = async () => {
    try {
      const updatedTag = {
        Name: tag.name,
        Status: isStatusActive, // Cập nhật trạng thái
        Summary: tag.summary,
        MetaTitle: tag.metaTitle,
        MetaKeyword: tag.metaKeyword,
        MetaDescription: tag.metaDescription,
      };
      // Gửi yêu cầu PUT tới API
      const response = await fetch(`http://localhost:5000/api/tags/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTag),
      });

      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          navigate("/admin-tag", {
            state: { message: `Đã chỉnh sửa thành công thẻ ${tag.name}` },
          });
        }, 0); // Sau 10 giây sẽ chuyển hướng
      } else {
        alert("Cập nhật thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thẻ:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tags/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTimeout(() => {
          navigate("/admin-tag", {
            state: { message: `Đã xóa thành công thẻ ${tag.name}` },
          });
        }, 0); // Sau 10 giây sẽ chuyển hướng
      } else {
        toast.error("Xóa thẻ thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa thẻ:", error);
      toast.error("Xóa thẻ thất bại");
    }
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        <div className="main-content">
          <div className="tab-content m-t-15">
            <Breadcrumb categories={level} />
            <Card className="shadow-lg p-4 rounded category-detail-form">
              <Card.Header className="">
                <h3 className="text-center">Chi Tiết Thẻ</h3>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="mb-3">
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label>Tên Danh Mục</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={tag.name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label>Người Tạo</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={tag.createdBy}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Trạng Thái</Form.Label>
                        <div className="form-switch m-t-10">
                          <Switch
                            checked={isStatusActive}
                            onChange={handleStatusChange}
                            id="statusSwitch"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={24}
                            width={48}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Ngày Tạo</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={tag.createdAt}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Ngày Sửa Đổi</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={tag.updatedAt}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="metaTitle"
                          value={tag.metaTitle}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Meta Keyword</Form.Label>
                        <Form.Control
                          type="text"
                          name="metaKeyword"
                          value={tag.metaKeyword}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="metaDescription"
                          value={tag.metaDescription}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="secondary"
                    className="mt-3 float-left"
                    onClick={handleBack}
                  >
                    Quay lại
                  </Button>

                  <Button
                    variant="primary"
                    className="mt-3 m-l-50"
                    onClick={handleSave}
                  >
                    Lưu chỉnh sửa
                  </Button>

                  <Button
                    variant="danger"
                    className="mt-3 float-right"
                    onClick={handleShowDeleteModal}
                  >
                    Xóa Thẻ
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <AdminSideNav />
      {/* Modal Xác Nhận Xóa */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa thẻ này không? Hành động này không thể hoàn
          tác.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TagDetail;
