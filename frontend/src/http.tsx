import axios from 'axios';
import { API_BASE_URL } from './config';
import { DepartmentCreate, Employee, ProjectCreate } from './models';

export const getEmployees = async () => {
  console.log('getEmployees');
  return axios.get(`${API_BASE_URL}/employees/?limit=1000`); //set limit to a 1000, otherwise we will only get the first 100 and that is the size of the base data
};

export const getEmployee = async (email: string) => {
  return axios.get(`${API_BASE_URL}/employees/${email}`);
};

export const createEmployee = async (employee: Employee) => {
  return axios.post(`${API_BASE_URL}/employees/`, employee);
};

export const editEmployee = async (employee: Employee) => {
  return axios.put(`${API_BASE_URL}/employees/${employee.email}`, employee);
};

export const deleteEmployee = async (employeeMail: string) => {
  console.log('deleteEmployee');
  console.log(`${API_BASE_URL}/employees/${employeeMail}/`);
  return axios.delete(`${API_BASE_URL}/employees/${employeeMail}/`);
};

export const getDepartments = async () => {
  return axios.get(`${API_BASE_URL}/departments/`);
};

export const getDepartment = async (id: number) => {
  return axios.get(`${API_BASE_URL}/departments/${id}`);
};

export const createDepartment = async (name: DepartmentCreate) => {
  return axios.post(`${API_BASE_URL}/departments/`, name);
};

export const editDepartment = async (id: number, name: string) => {
  return axios.put(`${API_BASE_URL}/departments/${id}`, name);
};

export const deleteDepartment = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/departments/${id}`);
};

export const getProjects = async () => {
  return axios.get(`${API_BASE_URL}/projects/`);
};

export const getProject = async (id: number) => {
  return axios.get(`${API_BASE_URL}/projects/${id}`);
};

export const createProject = async (project: ProjectCreate) => {
  return axios.post(`${API_BASE_URL}/projects/`, project);
};

export const editProject = async (id: number, name: string) => {
  return axios.put(`${API_BASE_URL}/projects/${id}`, name);
};

export const deleteProject = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/projects/${id}`);
};
