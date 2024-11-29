import React, { useState, useEffect } from "react";
import DataTable from "../../components/dataTables.js";
import AdminHeader from "../../components/AdminHeader.js";
import AdminSideNav from "../../components/AdminSideNav.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../components/Breadcrumb";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const level = [
    { name: "Trang Chủ", link: "/admin-home" },
    { name: "Quản Lý Tài Khoản", link: "" },
  ];

  const columns = [
    { key: "username", label: "Tên Đăng Nhập" },
    { key: "firstname", label: "Họ" },
    { key: "lastname", label: "Tên" },
    { key: "email", label: "Email" },
    { key: "role", label: "Vai Trò" },
    { key: "status", label: "Trạng Thái" },
    { key: "createdAt", label: "Ngày Tạo" },
  ];

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, {
        autoClose: 10000,
      });
    }
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    fetch("http://localhost:5000/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const transformedData = data.map((account) => ({
          id: account._id,
          username: account.Username,
          firstname: account.FirstName,
          lastname: account.LastName,
          email: account.Email,
          role: account.Role,
          bio: account.Bio,
          status: account.Status ? "Hoạt động" : "Không hoạt động",
          createdAt: new Date(account.createdAt).toLocaleDateString("vi-VN"),
        }));
        setAccounts(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
        setLoading(false);
      });
  };

  const handleRowDoubleClick = (rowData) => {
    navigate(`/admin-account/${rowData.id}`);
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
              <h2>Quản Lý Tài Khoản</h2>
              <DataTable
                key="accountTable"
                columns={columns}
                data={accounts}
                onRowDoubleClick={handleRowDoubleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <AdminSideNav />
      <ToastContainer />
    </div>
  );
};

export default Account;
