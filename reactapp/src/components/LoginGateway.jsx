import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginGateway.css";

const LoginGateway = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple mock authentication
    const teacherList = ["teacher1", "teacher2"];
    const studentList = ["student1", "student2"];

    if (teacherList.includes(username)) {
      alert(`Login successful ✅ as teacher`);
      navigate("/home", { state: { username, role: "teacher" } });
    } else if (studentList.includes(username)) {
      alert(`Login successful ✅ as student`);
      navigate("/home", { state: { username, role: "student" } });
    } else {
      alert("Invalid username ❌");
    }
  };

  return (
    <div className="login-gateway-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Teacher examples: teacher1, teacher2</p>
        <p>Student examples: student1, student2</p>
      </div>
    </div>
  );
};

export default LoginGateway;
