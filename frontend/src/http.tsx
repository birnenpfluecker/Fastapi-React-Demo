import axios from "axios";
import { API_BASE_URL } from "./config";
import { Employee } from "./models";

export const getEmployees = async () => {
  console.log("getEmployees");
  return axios.get(`${API_BASE_URL}/employees/`);
};

export const createEmployee = async (employee: Employee) => {
  return axios.post(`${API_BASE_URL}/employees/`, employee);
};

export const editEmployee = async (employee: Employee) => {
  return axios.put(`${API_BASE_URL}/employees/${employee.email}`, employee);
};

export const deleteEmployee = async (employee: Employee) => {
  return axios.delete(`${API_BASE_URL}/employees/${employee.email}`);
};
