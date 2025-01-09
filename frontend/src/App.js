import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // Import Login component
import Signup from "./pages/Signup"; // Import Signup component
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
function App() {
  
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Route for the landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for the dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the signup page */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
