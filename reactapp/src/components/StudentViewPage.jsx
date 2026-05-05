// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./StudentViewPage.css";

// const StudentViewPage = () => {
//   const [schedules, setSchedules] = useState([]);
//   const location = useLocation();
//   const role = location.state?.role;

//   const fetchSchedules = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/schedule/all");
//       if (!response.ok) throw new Error("Failed to fetch schedules");
//       const data = await response.json();
//       setSchedules(data);
//     } catch (error) {
//       console.error(error);
//       alert("Unable to load schedules ❌");
//     }
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   return (
//     <div className="schedule-container">
//       <h2 className="title">📖 Schedule List ({role})</h2>

//       {schedules.length === 0 ? (
//         <p className="no-data">No schedules available.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="schedule-table">
//             <thead>
//               <tr>
//                 <th>Class</th>
//                 <th>Subject</th>
//                 <th>Teacher</th>
//                 <th>Day</th>
//                 <th>Start</th>
//                 <th>End</th>
//                 <th>Note</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schedules.map((sch, index) => (
//                 <tr key={index}>
//                   <td>{sch.className}</td>
//                   <td>{sch.subject}</td>
//                   <td>{sch.teacherName}</td>
//                   <td>{sch.dayOfWeek}</td>
//                   <td>{sch.startTime}</td>
//                   <td>{sch.endTime}</td>
//                   <td>{sch.attendanceNote}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <button className="home-btn" onClick={() => window.history.back()}>
//           🔙 Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentViewPage;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./StudentViewPage.css";

const PAGE_SIZE = 5;

const StudentViewPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const location = useLocation();
  const role = location.state?.role;

  const fetchSchedules = async (pageNum = page, sortField = sortBy, sortDirection = sortDir) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/schedule/all?page=${pageNum}&size=${PAGE_SIZE}&sortBy=${sortField}&sortDir=${sortDirection}`
      );
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      alert("Unable to load schedules ❌");
    }
  };

  useEffect(() => {
    fetchSchedules(page, sortBy, sortDir);
    // eslint-disable-next-line
  }, [page, sortBy, sortDir]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(0);
  };

  return (
    <div className="schedule-container">
      <h2 className="title">📖 Schedule List ({role})</h2>

      {schedules.length === 0 ? (
        <p className="no-data">No schedules available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("className")}>
                  Class {sortBy === "className" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("subject")}>
                  Subject {sortBy === "subject" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("teacherName")}>
                  Teacher {sortBy === "teacherName" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("dayOfWeek")}>
                  Day {sortBy === "dayOfWeek" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("startTime")}>
                  Start {sortBy === "startTime" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("endTime")}>
                  End {sortBy === "endTime" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch, index) => (
                <tr key={index}>
                  <td>{sch.className}</td>
                  <td>{sch.subject}</td>
                  <td>{sch.teacherName}</td>
                  <td>{sch.dayOfWeek}</td>
                  <td>{sch.startTime}</td>
                  <td>{sch.endTime}</td>
                  <td>{sch.attendanceNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls" style={{ marginTop: "16px", textAlign: "center" }}>
        <button
          className="home-btn"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          ◀ Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="home-btn"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next ▶
        </button>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="home-btn" onClick={() => window.history.back()}>
          🔙 Back
        </button>
      </div>
    </div>
  );
};

export default StudentViewPage;