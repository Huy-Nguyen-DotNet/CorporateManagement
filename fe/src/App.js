import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer.js";
import Home from "./pages/home";
import AdminHome from "./pages/adminHome";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Thêm useLocation ở đây

import Login from "./pages/login";
<<<<<<< HEAD
import Catagory from "./pages/Category/category.js";
=======
>>>>>>> 6625084670e49f2dc1eba28df1bb927b399aa9fc

function App() {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại có phải là trang quản trị viên hay không
  const isAdminPage = location.pathname.includes("/admin");
<<<<<<< HEAD

  return (
    // <div>
    //   {!isAdminPage && <Header />} {/* Hiển thị Header */}
    //   {!isAdminPage && <Home />} {/* Hiển thị Header */}
    //   <Routes>
    //     {/* Định nghĩa route cho trang AdminHome */}
    //     <Route path="/admin-home" element={<AdminHome key="admin-home" />} />
    //   </Routes>
    //   {!isAdminPage && <Footer />}
    // </div>
    <div>
      <Catagory />
=======
  return (
    <div>
      {!isAdminPage && <Header />} {/* Hiển thị Header */}
      {!isAdminPage && <Home />} {/* Hiển thị Header */}
      <Routes>
        {/* Định nghĩa route cho trang AdminHome */}
        <Route path="/admin-home" element={<AdminHome key="admin-home" />} />
      </Routes>
      {!isAdminPage && <Footer />}
>>>>>>> 6625084670e49f2dc1eba28df1bb927b399aa9fc
    </div>
  );
}

export default App;
