INSERT INTO departments (department_name) VALUES ('Sales');
INSERT INTO departments (department_name) VALUES ('Engineering');
INSERT INTO departments (department_name) VALUES ('Productivity Engineering');

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Lead', '85000', 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', '65000', 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Motivator', '68000', 1);

INSERT INTO roles (title, salary, department_id) VALUES ('Lead Engineer', '95000', 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Engineer 2', '75000', 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Engineer 1', '68000', 2);

INSERT INTO roles (title, salary, department_id) VALUES ('Main Software Troubleshooter', '178000', 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Hardware Whacker', '124000', 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Printer Punisher', '235000', 3);

INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Shigeru', 'Miyamoto', 4, null);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Sly', 'Cooper', 5, 1);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Hershel', 'Law', 6, 1);

INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Claude', 'Vandamme', 1, null);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Redfield', 2, 4);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Jak', 'Mitsurugi', 3, 4);

INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Corvo', 'Haggar', 7, null);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Heihachi', 'Hibiki', 8, 7);
INSERT INTO  employees (first_name, last_name, role_id, manager_id) VALUES ('Junji', 'Toriyama', 9, 7);

