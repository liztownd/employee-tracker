DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR (30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR (30),
    salary DECIMAL NOT NULL,
    department_id INTEGER,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30),
    last_name DECIMAL NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
	PRIMARY KEY (id)
);

