import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Loginpage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExpenseManager from "./pages/ExpenseManager.jsx";
import ReportDownload from "./pages/ReportDownload.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to LoginPage */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/login/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Protected Routes with Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/expenses"
          element={
            <>
              <Navbar />
              <ExpenseManager />
            </>
          }
        />
        <Route
          path="/report"
          element={
            <>
              <Navbar />
              <ReportDownload />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
