import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import AddScheduleEntry from "./components/AddScheduleEntry";
import EditScheduleEntry from "./components/EditScheduleEntry";
import ViewScheduleEntries from "./components/ViewScheduleEntries";
import LoginPage from "./components/LoginPage"; // Teacher Login
import StudentLoginPage from "./components/StudentLoginPage"; // Student Login
import StudentViewPage from "./components/StudentViewPage"; // Student view-only page
import LoginGateway from "./components/LoginGateway"; // Gateway before Home

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial login gateway (choose teacher/student) */}
        <Route path="/" element={<LoginGateway />} />

        {/* Home page (after login) */}
        <Route path="/home" element={<Home />} />

        {/* Teacher Login (optional, can be removed if using gateway) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Student Login (optional, can be removed if using gateway) */}
        <Route path="/student-login" element={<StudentLoginPage />} />

        {/* Student View-only schedule */}
        <Route path="/student-view" element={<StudentViewPage />} />

        {/* Add new schedule entry (teacher only) */}
        <Route path="/add" element={<AddScheduleEntry />} />

        {/* Edit schedule entry with dynamic ID (teacher only) */}
        <Route path="/edit/:id" element={<EditScheduleEntry />} />

        {/* View all schedule entries (teacher only) */}
        <Route path="/view" element={<ViewScheduleEntries />} />
      </Routes>
    </Router>
  );
}

export default App;
