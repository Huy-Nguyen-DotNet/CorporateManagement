import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideNav from "../components/AdminSideNav";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các phần tử cần thiết cho chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminHome = () => {
  // Dữ liệu cho các biểu đồ
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Doanh thu",
        data: [65, 59, 80, 81, 56],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const customersChartData = {
    labels: ["Mới", "Trở Lại", "Khác"],
    datasets: [
      {
        label: "Truy Cập",
        data: [350, 450, 100],
        backgroundColor: ["green", "gray", "yellow"],
      },
    ],
  };
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
                      <i className="anticon anticon-user"></i>
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
                  <div className="m-t-50" style={{ height: "330px" }}>
                    <Line data={revenueChartData} />
                  </div>
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
                    <Line data={customersChartData} />
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
                                    id="progress-bar"
                                  ></div>
                                </div>
                                <div className="m-l-10">81%</div>
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
