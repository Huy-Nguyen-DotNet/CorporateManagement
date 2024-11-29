import React, { useState } from "react";
import logo from "../assets/images/logoVLU-1.png";
import bgVLU from "../assets/images/bg-VLU.jpg";

const Signup = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const bgVluImg = {
    backgroundImage: `url(${bgVLU})`,
  };

  // Hàm xử lý sự kiện đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (Password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    // Kiểm tra xem checkbox có được tick không
    if (!isChecked) {
      setErrorMessage("Bạn phải đồng ý với các chính sách.");
      return;
    }

    // Gửi request tới backend bằng fetch
    try {
      const response = await fetch("http://localhost:5000/api/accounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName,
          LastName,
          Username,
          Email,
          Password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Đăng ký thành công!");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Đã có lỗi xảy ra. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
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
                    <h2 className="m-b-0">Đăng Ký</h2>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="firstName"
                      >
                        Họ:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Họ"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="lastName"
                      >
                        Tên:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Tên"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="userName"
                      >
                        Tên tài khoản:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Tên tài khoản"
                        value={Username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-weight-semibold" htmlFor="email">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="password"
                      >
                        Mật khẩu:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Mật khẩu"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="font-weight-semibold"
                        htmlFor="confirmPassword"
                      >
                        Xác nhận Mật khẩu:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between p-t-15">
                        <div className="checkbox">
                          <input
                            id="checkbox"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                          />
                          <label htmlFor="checkbox">
                            <span>
                              Tôi đã đọc tất cả các <a href="">chính sách</a>
                            </span>
                          </label>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Đăng Ký
                        </button>
                      </div>
                    </div>

                    <p className="text-center">
                      Bạn đã có tài khoản? <a href="/admin-login">Đăng nhập</a>
                    </p>
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

export default Signup;
