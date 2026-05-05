import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleTeacher = () => {
    navigate("/login"); // Teacher login page
  };

  const handleStudent = () => {
    navigate("/student-login"); // Student login page
  };

  return (
    <div className="role-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button className="teacher-btn" onClick={handleTeacher}>
          👩‍🏫 Teacher
        </button>
        <button className="student-btn" onClick={handleStudent}>
          🧑‍🎓 Student
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
