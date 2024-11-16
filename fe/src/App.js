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

function App() {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại có phải là trang quản trị viên hay không
  const isAdminPage = location.pathname.includes("/admin");
  return (
    <div>
      {!isAdminPage && <Header />} {/* Hiển thị Header */}
      <Home />
      {!isAdminPage && <Footer />}
      <Routes>
        {/* Định nghĩa route cho trang AdminHome */}
        <Route path="/admin-home" element={<AdminHome key="admin-home" />} />
      </Routes>
    </div>
  );
}

export default App;
