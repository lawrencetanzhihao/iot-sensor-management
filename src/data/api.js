import axios from "axios";

export const getSensors = () => {
  return axios.get("http://localhost:3001/sensors");
};

export const addSensor = (newSensor) => {
  return axios.post("http://localhost:3001/sensors", newSensor);
};

export const updateSensor = (id, updatedSensor) => {
  return axios.put(`http://localhost:3001/sensors/${id}`, updatedSensor);
};

export const deleteSensor = (id) => {
  return axios.delete(`http://localhost:3001/sensors/${id}`);
};