import axios from 'axios';
import { API_BASE_URL } from './config';
import {
  Department,
  DepartmentCreate,
  Employee,
  Project,
  ProjectCreate,
} from './models';

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

export const updateEmployee = async (employee: Employee) => {
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

export const createDepartment = async (departmentCreate: DepartmentCreate) => {
  return axios.post(`${API_BASE_URL}/departments/`, departmentCreate);
};

export const updateDepartment = async (id: number, department: Department) => {
  return axios.put(`${API_BASE_URL}/departments/${id}`, department);
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

export const updateProject = async (id: number, project: Project) => {
  return axios.put(`${API_BASE_URL}/projects/${id}`, project);
};

export const deleteProject = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/projects/${id}`);
};
