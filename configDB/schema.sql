DROP DATABASE IF EXISTS businessDB;

CREATE DATABASE businessDB;

USE businessDB;

CREATE TABLE departments (

    id int NOT NULL AUTO_INCREMENT,
    department_name varchar(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE roles (

    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal NOT NULL,
    department_id int NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)

);

CREATE TABLE employees (

    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (id)

);