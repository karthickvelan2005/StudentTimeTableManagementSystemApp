import axios from "axios";
const API_URL = "http://localhost:8080/api/schedule";
export const getAllSchedules = () => {
  return axios.get(`${API_URL}/all`).then((res) => res.data);
};
export const getScheduleById = (id) => {
  return axios.get(`${API_URL}/${id}`).then((res) => res.data);
};
export const addSchedule = (schedule) => {
  return axios.post(`${API_URL}/add`, schedule).then((res) => res.data);
};
export const updateSchedule = (id, schedule) => {
  return axios.put(`${API_URL}/${id}`, schedule).then((res) => res.data);
};
export const deleteSchedule = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
