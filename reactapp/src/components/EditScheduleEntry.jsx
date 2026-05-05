import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as ScheduleService from "../services/scheduleService";

const EditScheduleEntry = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await ScheduleService.getScheduleById(id);
      setFormData(data);
    };
    fetchSchedule();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ScheduleService.updateSchedule(id, formData);
      navigate("/view");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="className"
        value={formData.className}
        onChange={handleChange}
      />
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <input
        type="text"
        name="teacherName"
        value={formData.teacherName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="dayOfWeek"
        value={formData.dayOfWeek}
        onChange={handleChange}
      />
      <input
        type="text"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
      />
      <input
        type="text"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
      />
      <input
        type="text"
        name="attendanceNote"
        value={formData.attendanceNote}
        onChange={handleChange}
      />

      <button type="submit">Update Entry</button>
    </form>
  );
};

export default EditScheduleEntry;
