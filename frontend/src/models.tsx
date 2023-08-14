import { AxiosResponse } from 'axios';

export class Employee {
  constructor(
    public email: string,
    public first_name: string,
    public last_name: string,
    public age: number,
    public department_id: number
  ) {}

  public toString() {
    return this.first_name + ' ' + this.last_name;
  }
}

export class Department {
  constructor(
    public id: number,
    public name: string,
    public employees: Employee[],
    public projects: Project[]
  ) {}
}

export class DepartmentCreate {
  constructor(
    public name: string,
    public employees: Employee[] = [],
    public projects: Project[] = []
  ) {}
}

export class Project {
  constructor(
    public id: number,
    public name: string,
    public client: string,
    public department_id: number
  ) {}
  public toString() {
    return this.name + ' ' + this.id;
  }
}

export class ProjectCreate {
  constructor(
    public name: string,
    public client: string,
    public department_id: number
  ) {}
}

//Interface for the raw data from the API

export interface RawEmployee extends AxiosResponse {
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  department_id: number;
}

export interface RawProject {
  id: number;
  name: string;
  client: string;
  department_id: number;
}

export interface RawDepartment {
  id: number;
  name: string;
  employees: RawEmployee[];
  projects: RawProject[];
}
