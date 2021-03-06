USE employeeDB;

INSERT INTO department (dept_name)
VALUE ("Sales");

INSERT INTO department (dept_name)
VALUE ("Design");

INSERT INTO department (dept_name)
VALUE ("Print Production");


INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 45000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Graphic Designer", 50000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Printer", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Ruth", "Ginsberg", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Elena", "Kagan", 1, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Sandra", "O'Connor", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mia", "Hamm", 2, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUE ("Kamala", "Harris", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ellie", "Doe", 3, 5);

