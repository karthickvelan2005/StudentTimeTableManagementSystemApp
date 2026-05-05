import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ScheduleService from "../services/scheduleService";
import "./ViewScheduleEntries.css"; // Import CSS

const PAGE_SIZE = 20;

const ViewScheduleEntries = () => {
  const [entries, setEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const fetchEntries = async (pageNum = page) => {
    try {
      const res = await ScheduleService.getAllSchedules(pageNum, PAGE_SIZE);
      setEntries(Array.isArray(res.content) ? res.content : []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      alert("Failed to load schedules ❌");
    }
  };

  useEffect(() => {
    fetchEntries(page);
    // eslint-disable-next-line
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await ScheduleService.deleteSchedule(id);
      fetchEntries(page);
    } catch (err) {
      console.error("Error deleting schedule:", err);
      alert("Failed to delete schedule ❌");
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="title">📅 All Schedule Entries</h2>

      {entries.length === 0 ? (
        <p className="no-data">No schedules available. Please add one.</p>
      ) : (
        <div className="table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.className}</td>
                  <td>{e.subject}</td>
                  <td>{e.teacherName}</td>
                  <td>{e.dayOfWeek}</td>
                  <td>{e.startTime}</td>
                  <td>{e.endTime}</td>
                  <td>{e.attendanceNote}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit/${e.id}`)}
                    >
                      ✏ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
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

      {/* Back Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button className="home-btn" onClick={() => navigate(-1)}>
          🔙 Back
        </button>
      </div>
    </div>
  );
};

export default ViewScheduleEntries;