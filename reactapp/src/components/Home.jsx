// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import "./Home.css";
// import Footer from "./Footer";

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const role = location.state?.role;
//   const username = location.state?.username;

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!role || !username) {
//       alert("Please login first ❌");
//       navigate("/");
//     }
//   }, [role, username, navigate]);

//   return (
//     <div className="home-page">
//       {role && username && (
//         <p className="welcome-msg">
//           Welcome {role === "teacher" ? "Teacher" : "Student"}: <strong>{username}</strong>
//         </p>
//       )}

//       <h1 className="home-title">📚 School Timetable & Attendance System</h1>
//       <p className="home-tagline">Manage class schedules and attendance records in one place.</p>
//             {/* Banner Image */}
//       <div className="home-image-wrapper">
//         <img
//           src="https://media.licdn.com/dms/image/v2/D5612AQHA4yEJVVrl1A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693415698183?e=2147483647&v=beta&t=NnaJ8-ZZ2DADqD4ECr1t_fAmA3IjMA5RPrlJ-EXLCVg"
//           alt="Timetable Banner"
//           className="home-image"
//         />
//       </div>
//       <div className="home-buttons">
//         {role === "teacher" && (
//           <>
//             <button
//               className="home-btn"
//               onClick={() => navigate("/add", { state: { username, role } })}
//             >
//               ➕ Add Schedule
//             </button>
//             <button
//               className="home-btn"
//               onClick={() => navigate("/view", { state: { username, role } })}
//             >
//               📖 View Schedule
//             </button>
//           </>
//         )}

//         {role === "student" && (
//           <button
//             className="home-btn"
//             onClick={() => navigate("/student-view", { state: { username, role } })}
//           >
//             📖 View Schedule (Student)
//           </button>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Home.css";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  const username = location.state?.username;

  // Redirect if not logged in
  useEffect(() => {
    if (!role || !username) {
      alert("Please login first ❌");
      navigate("/");
    }
  }, [role, username, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken"); // clear token if stored
    navigate("/"); // back to LoginGateway
  };

  return (
    <div className="home-page">
      {/* Top bar with welcome + logout */}
      <div className="top-bar">
        {role && username && (
          <p className="welcome-msg">
            Welcome {role === "teacher" ? "Teacher" : "Student"}:{" "}
            <strong>{username}</strong>
          </p>
        )}
        <a href="/" onClick={handleLogout} className="logout-link">
          🚪 Logout
        </a>
      </div>

      <h1 className="home-title">📚 School Timetable & Attendance System</h1>
      <p className="home-tagline">Manage class schedules and attendance records in one place.</p>

      {/* Banner Image */}
      <div className="home-image-wrapper">
        <img
          src="https://media.licdn.com/dms/image/v2/D5612AQHA4yEJVVrl1A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693415698183?e=2147483647&v=beta&t=NnaJ8-ZZ2DADqD4ECr1t_fAmA3IjMA5RPrlJ-EXLCVg"
          alt="Timetable Banner"
          className="home-image"
        />
      </div>

      <div className="home-buttons">
        {role === "teacher" && (
          <>
            <button
              className="home-btn"
              onClick={() => navigate("/add", { state: { username, role } })}
            >
              ➕ Add Schedule
            </button>
            <button
              className="home-btn"
              onClick={() => navigate("/view", { state: { username, role } })}
            >
              📖 View Schedule
            </button>
          </>
        )}

        {role === "student" && (
          <button
            className="home-btn"
            onClick={() => navigate("/student-view", { state: { username, role } })}
          >
            📖 View Schedule (Student)
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
