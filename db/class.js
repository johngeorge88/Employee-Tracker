const connection = require("./database");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewDepartment() {
        return this.connection.promise().query(`SELECT d.id AS 'department_id', d.name
        FROM department AS d`);
    }

    viewEmployees() {
        return this.connection.promise()
            .query(`SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name, role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager_name
            FROM role 
    
    LEFT JOIN employees ON employees.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employees AS manager ON manager.id = employees.manager_id`);
    }

    viewRoles() {
        return this.connection
            .promise()
            .query(
                "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
            );
    }

    addEmployee(employee) {
        return this.connection
            .promise()
            .query("INSERT into employees set ?", employee);
    }

    addDepartment(department) {
        return this.connection
            .promise()
            .query("INSERT into department set ?", department);
    }

    addRole(role) {
        return this.connection.promise().query("INSERT into role SET ?", role);
    }

    roleQuery() {
        return this.connection.promise().query(`SELECT role.id, role.title 
                                                    FROM role`)
    }

    getManager() {
        return this.connection.promise().query(`SELECT * FROM employees`)
    }

    updateRole(update) {
        return this.connection
            .promise()
            .query(
                "UPDATE employees SET role_Id = ? WHERE first_name = ? AND last_name = ?",
                [update.role_id, update.first_name, update.last_name]
            );
    }

    fullNameQuery() {
        return this.connection.promise().query(`SELECT * FROM employees`)
      }
}

module.exports = new DB(connection);