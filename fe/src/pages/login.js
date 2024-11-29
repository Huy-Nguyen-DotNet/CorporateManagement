import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logoVLU-1.png";
import bgVLU from "../assets/images/bg-VLU.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Để điều hướng trang sau khi đăng nhập thành công

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username,
      password,
    };

    try {
      // Gửi yêu cầu POST tới backend để đăng nhập
      const response = await axios.post(
        "http://localhost:5000/api/accounts/login", // Cập nhật URL cho đúng
        userCredentials
      );

      console.log(response.data); // Xem phản hồi từ server

      if (response.data && response.data.token) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);

        // Kiểm tra nếu có dữ liệu người dùng
        if (response.data.user) {
          const userData = {
            firstname: response.data.user.FirstName,
            lastname: response.data.user.LastName,
            role: response.data.user.Role,
            avatar: response.data.user.Avatar,
          };

          // Lưu thông tin người dùng vào localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          console.log("User Data:", userData);
        } else {
          console.error("Không có thông tin người dùng trong phản hồi");
        }

        // Điều hướng tới trang chính
        navigate("/admin-home");
      } else {
        // Nếu không có token, thông báo lỗi
        setError("Tên tài khoản hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      setError("Tên tài khoản hoặc mật khẩu không đúng.");
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = () => {
    navigate("/admin-signup");
  };

  // Cấu hình background image
  const bgVluImg = {
    backgroundImage: `url(${bgVLU})`,
  };

  return (
    <div
      className="container-fluid p-h-0 p-v-20 bg full-height d-flex"
      style={bgVluImg}
    >
      <div className="d-flex flex-column justify-content-between w-100">
        <div className="container d-flex h-100">
          <div className="row align-items-center w-100">
            <div className="col-md-7 col-lg-5 m-h-auto">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between m-b-30">
                    <img className="img-fluid" src={logo} alt="Logo VLU" />
                    <h2 className="m-b-0">Đăng Nhập</h2>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label
                        className="float-left font-weight-bold"
                        htmlFor="userName"
                      >
                        Tên tài khoản:
                      </label>
                      <div className="input-affix">
                        <i
                          className="fa fa-user prefix-icon"
                          aria-hidden="true"
                        ></i>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="Tên tài khoản"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="float-left font-weight-bold"
                        htmlFor="password"
                      >
                        Mật khẩu:
                      </label>
                      <a
                        className="float-right font-size-13 text-muted font-weight-semibold"
                        href="#"
                      >
                        Quên Mật Khẩu?
                      </a>
                      <div className="input-affix m-b-10">
                        <i
                          className="fa fa-lock prefix-icon"
                          aria-hidden="true"
                        ></i>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="font-size-13 text-muted font-weight-semibold">
                          Bạn chưa có tài khoản?
                          <a
                            className="small m-l-10 font-size-13"
                            href="/admin-signup"
                          >
                            Đăng ký ngay
                          </a>
                        </span>
                        <button type="submit" className="btn btn-primary">
                          Đăng Nhập
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
