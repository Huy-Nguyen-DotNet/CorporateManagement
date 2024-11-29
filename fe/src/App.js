import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer.js";
import Home from "./pages/home";
import AdminHome from "./pages/adminHome";
import AdminLogin from "./pages/login";
import NewSingle from "./pages/new-single";
import Category from "./pages/category";
import AdminSignup from "./pages/signup";
import AdminCategory from "./pages/Category/category";
import AdminCategoryDetail from "./pages/Category/categoryDetail";
import AdminTag from "./pages/Tag/tag";
import AdminTagDetail from "./pages/Tag/tagDetail";
import AdminNew from "./pages/news/news";
import AdminAccount from "./pages/Account/account";
import AdminAccountDetail from "./pages/Account/accountDetail";
import AdminEditProfile from "./pages/editProfile";
import AdminChangePassword from "./pages/changePassword";
import SearchPage from "./pages/SearchPage";
import NewsDetail from "./pages/news/newsDetail"; // Component hiển thị chi tiết bài viết
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Thêm useLocation ở đây

function App() {
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại có phải là trang quản trị viên hay không
  const isAdminPage = location.pathname.includes("/admin");

  return (
    <div>
      {!isAdminPage && <Header />} {/* Hiển thị Header */}
      <Routes>
        {/* Định nghĩa route cho trang AdminHome */}
        <Route path="/admin-home" element={<AdminHome key="admin-home" />} />
        <Route path="/home" element={<Home key="home" />} />
        <Route path="/new-single/:id" element={<NewSingle />} />
        <Route path="/category/:id" element={<Category />} />
        <Route
          path="/admin-edit-profile"
          element={<AdminEditProfile key="admin-edit-profile" />}
        />
        <Route
          path="/admin-change-password"
          element={<AdminChangePassword key="admin-change-password" />}
        />
        <Route path="/admin-login" element={<AdminLogin key="admin-login" />} />
        <Route
          path="/admin-signup"
          element={<AdminSignup key="admin-signup" />}
        />
        <Route path="/admin-category" element={<AdminCategory />} />
        <Route path="/admin-category/:id" element={<AdminCategoryDetail />} />
        <Route path="/admin-tag" element={<AdminTag />} />
        <Route path="/admin-tag/:id" element={<AdminTagDetail />} />
        <Route path="/admin-account" element={<AdminAccount />} />
        <Route path="/admin-account/:id" element={<AdminAccountDetail />} />
        <Route path="/admin-new" element={<AdminNew />} />
        <Route path="/admin-news/:id" element={<NewsDetail />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
      {<Footer />}
    </div>
    // <div>
    //   <Login />
    // </div>
  );
}

export default App;
