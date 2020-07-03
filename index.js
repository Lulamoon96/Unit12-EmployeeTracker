const inquirer = require("inquirer")
const mysql = require("mysql")
const figlet = require('figlet')

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "businessDB"
  })

connection.connect(err => {

    if (err) throw err;

    console.log(figlet.textSync('Employee Manager', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
        })
    )

    employeeInquire();
})

const employeeInquire = () => {

    inquirer
        .prompt({

            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Update an Employee's Role",
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Remove Department",
                "Remove Role"
            ]

        })
        .then(answer => {

            switch(answer.action){

                case "View All Employees":
                    view("employees")
                    break
                
                case "View All Departments":
                    view("departments")
                    break

                case "View All Roles":
                    view("roles")
                    break
                
                case "Add Employee":
                    add("employee")
                    break

                case "Update an Employee's Role":
                    update("employee role")
                    break

                case "Add Department":
                    add("department")
                    break

                case "Add Role":
                    add("role")
                    break

                case "Remove Employee":
                    remove("employee")
                    break

                case "Remove Department":
                    remove("department")
                    break

                case "Remove Role":
                    remove("role")
                    break

            }

        })

}

const view = (toView) => {

    switch(toView){

        case "roles":

        case "departments":

            connection.query("SELECT * FROM ??", toView, (err, res) =>{

                if (err) throw err
                console.table(res)
                employeeInquire()

            })
            break
        
        case "employees":
            let query = "SELECT e1.id employee_ID, e1.first_name, e1.last_name, roles.title, departments.department_name, roles.salary, CONCAT(e2.first_name, ' ', e2.last_name) Manager "
            query += "FROM employees e1 "
            query += "LEFT JOIN employees e2 ON e1.manager_id = e2.id "
            query += "INNER JOIN roles ON roles.id = e1.role_id "
            query += "INNER JOIN departments ON departments.id = roles.department_id "
            query += "ORDER BY departments.department_name ASC, roles.salary DESC"


            connection.query(query, (err, res) => {

                if (err) throw err
                console.table(res)
                employeeInquire()

            })

            break



    }

}

const add = (toAdd) => {

    switch(toAdd){

        case "employee":

            connection.query("SELECT title FROM roles", (err, res) => {

                if (err) throw err
                    
                const roles = []
                res.forEach(role => roles.push(role.title))
                connection.query("SELECT CONCAT(employees.first_name, ' ', employees.last_name) ManagerName FROM employees WHERE employees.manager_id IS NULL",(err, res) => {
            
                    if (err) throw err
                    const managers = []
                    res.forEach(manager => managers.push(manager.ManagerName))
                    managers.push("Employee is Manager")

                    inquirer
                        .prompt([{

                            name: "firstName",
                            type: "input", 
                            message: "What is the employee's first name?"

                        },
                        
                        {

                            name: "lastName",
                            type: "input",
                            message: "What is the employee's last name?"

                        },

                        {

                            name: "role",
                            type:"list",
                            message: "What is this employee's role?",
                            choices: roles

                        },

                        {

                            name: "manager",
                            type:"list",
                            message: "What is employee ID of this employee's manager?",
                            choices: managers

                        }

                    ])
                    .then(response => {

                        const {firstName, lastName, role, manager} = response

                        connection.query("SELECT id FROM roles WHERE roles.title = ?", role, (err, res) => {

                            if (err) throw err
                            const roleID = res[0].id

                            connection.query("SELECT id FROM employees WHERE employees.first_name = ?", manager.replace(/ .*/,''), (err, res) => {
            
                                if (err) throw err
                                if (manager === "Employee is Manager"){

                                    given = null

                                }

                                else{

                                    given = res[0].id

                                }

                                connection.query("INSERT INTO employees SET ?", {first_name: firstName, last_name: lastName, role_id: roleID, manager_id: given}, (err, res) =>{
    
                                    if (err) throw err
                                    view("employees")
    
                                })

                            })

                        })

                    })

                })

            })
        break

        case "role":
            connection.query("SELECT department_name FROM departments", (err, res) => {

                if (err) throw err
                const departments = []
                res.forEach(department => departments.push(department.department_name))
                inquirer
                    .prompt([{

                        name: "roleName",
                        type: "input", 
                        message: "What is the name of the role?"

                    },
                    {

                        name: "salary",
                        type: "number",
                        message: "What is the salary for this role?"

                    },
                    {

                        name: "department",
                        type: "list",
                        message: "What department is this role a part of?",
                        choices: departments

                    }
                    ])
                    .then(response => {

                        const { roleName, salary, department } = response
    
                        connection.query("SELECT departments.id FROM departments WHERE departments.department_name = ?", department, (err, res) => {
    
                            if (err) throw err
    
                            const depID = res[0].id
    
                            connection.query("INSERT INTO roles SET ?", {title: roleName, salary: salary, department_id: depID}, (err, res) =>{
    
                                if (err) throw err
                                view("roles")
    
                            })
        
                        })
                    })
                })
        break
                
    
        case "department":
            inquirer
                .prompt({

                    name: "departmentName",
                    type: "input", 
                    message: "What is the name of the department?"

                })
                .then(response => {

                    connection.query("INSERT INTO departments (department_name) VALUES (?)", response.departmentName, (err, res) =>{

                        if (err) throw err
                        view("departments")

                    })

                })
        break

    }

}

const update = (toUpdate) => {

    switch(toUpdate){

        case "employee role":

            connection.query("SELECT CONCAT(employees.first_name, ' ', employees.last_name) EmployeeName FROM employees", (err, res) =>{

                if (err) throw err
                const employees = []
                res.forEach(employee => employees.push(employee.EmployeeName))

                connection.query("SELECT title FROM roles", (err, res) =>{

                    if (err) throw err
                    const roles = []
                    res.forEach(role => roles.push(role.title))
                    inquirer
                        .prompt([{

                            name:"employee",
                            type: "list",
                            message: "Which employee's role would you like to update?",
                            choices: employees
                        },
                        {
                            name:"role",
                            type:"list",
                            message:"What new role would you like to give them?",
                            choices: roles
                        }
                        ])
                        .then(response => {

                            const { employee, role} = response

                            connection.query("SELECT id FROM employees WHERE employees.first_name = ?", employee.replace(/ .*/,''), (err, res) => {

                                if (err) throw err
                                const employeeID = res[0].id

                                connection.query("SELECT id FROM roles WHERE roles.title = ?", role, (err, res) =>{

                                    if (err) throw err
                                    const roleID = res[0].id

                                    connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [roleID, employeeID], (err, res) => {

                                        if (err) throw err
                                        view("employees")

                                    })

                                })

                            })

                        })

                })

            })
        break

    }

}

const remove = (toRemove) => {

    switch(toRemove){

        case "employee":
            connection.query("SELECT CONCAT(employees.first_name, ' ', employees.last_name) EmployeeName FROM employees", (err, res) =>{

                if (err) throw err
                const employees = []
                res.forEach(employee => employees.push(employee.EmployeeName))

                inquirer
                    .prompt({

                        name:"employee",
                        type: "list",
                        message: "What employee would you like to remove?",
                        choices: employees

                    })
                    .then(response => {

                        const { employee } = response

                        connection.query("SELECT id FROM employees WHERE employees.first_name = ?", employee.replace(/ .*/,''), (err, res) => {

                            if (err) throw err
                            const employeeID = res[0].id

                            connection.query("DELETE FROM employees WHERE id = ?", [employeeID], (err, res) => {

                                if (err) throw err
                                view("employees")

                            })

                        })

                })

            })
        break

        case "department":
            connection.query("SELECT department_name FROM departments", (err, res) =>{

                if (err) throw err
                const departments = []

                res.forEach(department => departments.push(department.department_name))
                    inquirer
                        .prompt({

                            name:"department",
                            type: "list",
                            message: "What department would you like to remove?",
                            choices: departments
                        })
                        .then(response => {

                            const { department } = response

                            connection.query("SELECT id FROM departments WHERE departments.department_name = ?", department, (err, res) => {

                                if (err) throw err
                                const departmentID = res[0].id

                                connection.query("DELETE FROM departments WHERE id = ?", [departmentID], (err, res) => {

                                    if (err) throw err
                                    view("departments")

                                })

                            })

                        })

            })
        break

        case "role":
            connection.query("SELECT title FROM roles", (err, res) =>{

                if (err) throw err
                const roles = []

                res.forEach(role => roles.push(role.title))
                    inquirer
                        .prompt({

                            name:"role",
                            type: "list",
                            message: "What role would you like to remove?",
                            choices: roles
                        })
                        .then(response => {

                            const { role } = response

                            connection.query("SELECT id FROM roles WHERE title = ?", role, (err, res) => {

                                if (err) throw err
                                const roleID = res[0].id

                                connection.query("DELETE FROM roles WHERE id = ?", [roleID], (err, res) => {

                                    if (err) throw err
                                    view("roles")

                                })

                            })

                        })

            })
        break

    }

}
