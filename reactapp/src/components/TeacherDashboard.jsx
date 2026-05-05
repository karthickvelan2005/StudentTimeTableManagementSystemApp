import React, { useEffect, useState } from "react";

const TeacherDashboard = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/teacher/data", {
          headers: {
            Authorization: `Bearer ${token}`, // attach JWT
          },
        });

        if (response.ok) {
          const result = await response.text(); // or response.json() if backend returns JSON
          setData(result);
        } else {
          setError("Unauthorized or failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      {data && <div>Data: {data}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TeacherDashboard;
