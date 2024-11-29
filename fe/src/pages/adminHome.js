import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSideNav from "../components/AdminSideNav";
import "../assets/css/adminCss/AdminHome.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const customersChartData = {
    labels: ["Mới", "Trở Lại", "Khác"],
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ["#00C9A7", "#886CFF", "#FFC107"],
      },
    ],
  };
  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: true, // Bật tooltip khi hover
      },
      legend: {
        display: false, // Tắt chú thích nếu không cần
      },
    },
  };

  const [percentage, setPercentage] = useState(0); // Tạo state để lưu phần trăm

  useEffect(() => {
    const actualValue = 4.9;
    const maxValue = 5;

    // Tính phần trăm
    const calculatedPercentage = (actualValue / maxValue) * 100;

    // Cập nhật state
    setPercentage(calculatedPercentage);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Chuyển hướng đến trang đăng nhập nếu không có token
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div>
      <AdminHeader />
      <div className="page-container">
        {/* Content Wrapper START */}
        <div className="main-content">
          {/* Stats Cards */}
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="avatar avatar-icon avatar-lg avatar-blue">
                      <i className="far fa-newspaper"></i>
                    </div>
                    <div className="m-l-15">
                      <h2 className="m-b-0">178</h2>
                      <p className="m-b-0 text-muted">Tổng Số Bài Viết</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="avatar avatar-icon avatar-lg avatar-purple">
                      <i className="icon-people"></i>
                    </div>
                    <div className="m-l-15">
                      <h2 className="m-b-0">1,832</h2>
                      <p className="m-b-0 text-muted">Tổng Số Người Dùng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <div className="avatar avatar-icon avatar-lg avatar-cyan">
                      <i className="fas fa-dot-circle"></i>
                    </div>
                    <div className="m-l-15">
                      <h2 className="m-b-0">1</h2>
                      <p className="m-b-0 text-muted">Số Lượng Quản Trị Viên</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Thống Kê</h5>
                    <div>
                      <div className="btn-group">
                        <button className="btn btn-default active">
                          <span>Tháng</span>
                        </button>
                        <button className="btn btn-default">
                          <span>Năm</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="m-t-50" style={{ height: "330px" }}></div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="m-b-0">Truy Cập</h5>
                  <div
                    className="m-v-60 text-center chart-container"
                    style={{ height: "200px" }}
                  >
                    <Pie data={customersChartData} options={chartOptions} />
                  </div>
                  <div className="row border-top p-t-25">
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="media align-items-center">
                          <span className="badge badge-success badge-dot m-r-10"></span>
                          <div className="m-l-5">
                            <h4 className="m-b-0">350</h4>
                            <p className="m-b-0 muted">Mới</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="media align-items-center">
                          <span className="badge badge-secondary badge-dot m-r-10"></span>
                          <div className="m-l-5">
                            <h4 className="m-b-0">450</h4>
                            <p className="m-b-0 muted">Trở Lại</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="media align-items-center">
                          <span className="badge badge-warning badge-dot m-r-10"></span>
                          <div className="m-l-5">
                            <h4 className="m-b-0">100</h4>
                            <p className="m-b-0 muted">Khác</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Articles and Featured Authors */}
          <div className="row">
            <div className="col-md-12 col-lg-5">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="m-b-0">Bài Viết Mới Đăng</h5>
                    <div>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm btn-default"
                      >
                        Xem Tất Cả
                      </a>
                    </div>
                  </div>
                  <div className="m-t-30">
                    <div className="m-b-25">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="media align-items-center">
                          <div className="font-size-35">
                            <i className="anticon anticon-file-excel text-success"></i>
                          </div>
                          <div className="m-l-15">
                            <h6 className="m-b-0">
                              <a
                                className="text-dark"
                                href="javascript:void(0);"
                              >
                                Database_Schema.xlsx
                              </a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-7">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Tác Giả Nổi Bật</h5>
                    <div>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm btn-default"
                      >
                        Xem Tất Cả
                      </a>
                    </div>
                  </div>
                  <div className="m-t-30">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tác Giả</th>
                            <th>Bài Viết</th>
                            <th style={{ maxWidth: "70px" }}>Đánh Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="media align-items-center">
                                <div className="avatar avatar-image rounded">
                                  <img
                                    src="assets/images/avatars/mHuy.jpg"
                                    alt=""
                                  />
                                </div>
                                <div className="m-l-10">
                                  <span>Nguyễn Minh Huy</span>
                                </div>
                              </div>
                            </td>
                            <td>81</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress progress-sm w-100 m-b-0">
                                  <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${percentage}%` }} // Gán chiều rộng dựa trên state
                                  ></div>
                                </div>
                                <div className="m-l-10">
                                  {percentage.toFixed(1)}%
                                </div>{" "}
                                {/* Hiển thị phần trăm */}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Wrapper END */}
      </div>
      <AdminSideNav />
    </div>
  );
};

export default AdminHome;
