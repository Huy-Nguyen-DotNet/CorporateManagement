import React from 'react';
import logo from '../assets/images/logoVLU-1.png';
import bgVLU from '../assets/images/bg-VLU.jpg';
const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here
        console.log("Login button clicked");
    };
const bgVluImg = {
    backgroundImage: `url(${bgVLU})`,
};
    return (
        <div className="container-fluid p-h-0 p-v-20 bg full-height d-flex" style={bgVluImg}>
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
                                            <label className="float-left font-weight-bold" htmlFor="userName">Tên tài khoản:</label>
                                            <div className="input-affix">
                                                <i className="fa fa-user prefix-icon" aria-hidden="true"></i>
                                                <input type="text" className="form-control" id="userName" placeholder="Tên tài khoản" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="float-left font-weight-bold" htmlFor="password">Mật khẩu:</label>
                                            <a className="float-right font-size-13 text-muted font-weight-semibold" href="#">Quên Mật Khẩu?</a>
                                            <div className="input-affix m-b-10">
                                                <i className="fa fa-lock prefix-icon" aria-hidden="true"></i>
                                                <input type="password" className="form-control" id="password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="font-size-13 text-muted font-weight-semibold">
                                                    Bạn chưa có tài khoản?
                                                    <a className="small m-l-10 font-size-13" href="sign-up.html">Đăng ký ngay</a>
                                                </span>
                                                <button type="submit" className="btn btn-primary">Đăng Nhập</button>
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
