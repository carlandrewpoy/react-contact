import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./utils/AuthContext";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import ChangePasswordForm from "./pages/ChangePass";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/changepassword" element={<ChangePasswordForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
