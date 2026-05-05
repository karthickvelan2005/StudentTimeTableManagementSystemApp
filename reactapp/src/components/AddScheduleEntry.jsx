// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./AddScheduleEntry.css";

// const AddScheduleEntry = () => {
//   const [formData, setFormData] = useState({
//     className: "",
//     subject: "",
//     teacherName: "",
//     dayOfWeek: "",
//     startTime: "",
//     endTime: "",
//     attendanceNote: "",
//   });

//   const navigate = useNavigate();
//   const location = useLocation();
//   const username = location.state?.username;
//   const role = location.state?.role;

//   // Redirect if role is missing or not teacher
//   useEffect(() => {
//     if (!role || role !== "teacher") {
//       alert("You must be logged in as a teacher to access this page ❌");
//       navigate("/"); // Redirect to login gateway
//     }
//   }, [role, navigate]);

//   // Update form state
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/schedule/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // JWT token
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add schedule");
//       }

//       const result = await response.json();
//       console.log("Schedule saved:", result);
//       alert("Schedule added successfully ✅");

//       // Clear form
//       setFormData({
//         className: "",
//         subject: "",
//         teacherName: "",
//         dayOfWeek: "",
//         startTime: "",
//         endTime: "",
//         attendanceNote: "",
//       });

//       // Navigate to teacher view page
//       navigate("/view", { state: { username, role } });
//     } catch (error) {
//       console.error("Error adding schedule:", error);
//       alert("Error adding schedule ❌. Make sure backend is running and CORS/JWT are correct.");
//     }
//   };

//   return (
//     <div>
//       <h2 className="form-title">Add Schedule Entry</h2>
//       <form className="add-schedule-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="className"
//           placeholder="Class Name"
//           value={formData.className}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           value={formData.subject}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="teacherName"
//           placeholder="Teacher Name"
//           value={formData.teacherName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="dayOfWeek"
//           placeholder="Day of Week"
//           value={formData.dayOfWeek}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="time"
//           name="startTime"
//           value={formData.startTime}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="time"
//           name="endTime"
//           value={formData.endTime}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="attendanceNote"
//           placeholder="Attendance Note"
//           value={formData.attendanceNote}
//           onChange={handleChange}
//         />
//         <button type="submit">Add Entry</button>
//       </form>

//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <button
//           className="home-btn"
//           onClick={() =>
//             navigate(role === "teacher" ? "/home" : "/student-view", {
//               state: { username, role },
//             })
//           }
//         >
//           🔙 Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddScheduleEntry;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddScheduleEntry.css";

const AddScheduleEntry = () => {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    teacherName: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    attendanceNote: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const role = location.state?.role;

  // Redirect if not teacher
  useEffect(() => {
    if (role !== "teacher") {
      alert("Only teachers can access this page ❌");
      navigate("/"); // back to login
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/schedule/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add schedule");

      alert("Schedule added successfully ✅");
      setFormData({
        className: "",
        subject: "",
        teacherName: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        attendanceNote: "",
      });
      navigate("/view", { state: { username, role } });
    } catch (error) {
      console.error(error);
      alert("Error adding schedule ❌. Make sure backend is running.");
    }
  };

  return (
    <div>
      <h2 className="form-title">Add Schedule Entry</h2>
      <form className="add-schedule-form" onSubmit={handleSubmit}>
        <input type="text" name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <input type="text" name="teacherName" placeholder="Teacher Name" value={formData.teacherName} onChange={handleChange} required />
        <input type="text" name="dayOfWeek" placeholder="Day of Week" value={formData.dayOfWeek} onChange={handleChange} required />
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <input type="text" name="attendanceNote" placeholder="Attendance Note" value={formData.attendanceNote} onChange={handleChange} />
        <button type="submit">Add Entry</button>
      </form>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="home-btn" onClick={() => navigate("/home", { state: { username, role } })}>
          🔙 Back
        </button>
      </div>
    </div>
  );
};

export default AddScheduleEntry;
