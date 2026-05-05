// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";
// import "./StudentViewPage.css";

// const StudentLoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState(""); // optional
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("jwtToken", data.token);

//         alert("Student login successful ✅");
//         navigate("/student-view", { state: { role: "student", username } });
//       } else {
//         alert("Invalid username or password ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2 className="login-title">👨‍🎓 Student Login</h2>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p style={{ marginTop: "15px", color: "#555", fontSize: "14px" }}>
//         Example usernames: student1, student2, student3
//       </p>
//     </div>
//   );
// };

// export default StudentLoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "./StudentViewPage.css";

const StudentLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Use environment variable for API
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Store token
        localStorage.setItem("jwtToken", data.token);

        alert("Student login successful ✅");

        // ✅ Navigate after login
        navigate("/student-view", {
          state: { role: "student", username },
        });
      } else {
        alert("Invalid username or password ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">👨‍🎓 Student Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* PASSWORD (FIXED) */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px", color: "#555", fontSize: "14px" }}>
        Example usernames: student1, student2, student3
      </p>
    </div>
  );
};

export default StudentLoginPage;