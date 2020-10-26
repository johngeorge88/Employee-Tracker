const inquirer = require("inquirer");

const cTable = require("console.table");
const db = require("./db/class");

// Main menu prompt
const menuPrompt = function () {
    let questions = [
        {
            type: "list",
            name: "name",
            message: "What would you like to do?",
            choices: [
                "View all Departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an Employee",
                "Update employee role",
                "Exit"
            ],
        },
    ];
    inquirer.prompt(questions).then((choice) => {
        switch (choice.name) {
            case "Add an Employee":
                addEmployee();
                break;
            case "View all Departments":
                viewDepartment();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Update employee role":
                updateRole();
                break;
            case "Exit":
                quitApp();
            default:
                console.log("Please make a choice");
        }
    });
};

menuPrompt();

const viewDepartment = () => {
    db.viewDepartment().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    });
};

const viewEmployees = () => {
    db.viewEmployees().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    });
};

const viewRoles = () => {
    db.viewRoles().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    });
};

const addEmployee = function () {
    db.roleQuery().then(([rows]) => {
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }))

        db.getManager().then(([rows]) => {
            const manager = rows.map(({ id, first_name, last_name }) => ({ name: first_name + "   " + last_name, value: id }));


            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the employee',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the employee',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'choose a role for the employee',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'choose a manager for the employee',
                    choices: manager
                },
            ]).then((res) => {
                db.addEmployee(res)
                    .then(() => {
                        console.log(`\nNew employee ${res.first_name}" "${res.last_name}" " successfully added!\n`)

                        menuPrompt()
                    })
            })
        })
    })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "Please enter a department name",
                validate: (departmentInput) => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name!");
                        return false;
                    }
                },
            },
        ])
        .then((res) => {
            db.addDepartment({
                name: res.department,
            });
            console.log("Department added successfully");
            menuPrompt();
        });
};

const addRole = () => {
    db.viewDepartment().then(([rows]) => {
        const department = rows.map(({ department_id, name }) => ({ name: name, value: department_id }))

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the role you would like to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role you would like to add?",
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Choose a department for this role',
                choices: department
            },
        ])
            .then((res) => {
                db.addRole(res)
                    .then(() => {
                        console.log(`\nNew role ${res.title} successfully added!\n`)
                        menuPrompt()
                    })
            })
    })
}

const updateRole = function () {
    db.roleQuery().then(([rows]) => {
      const roles = rows.map(({ id, title }) => ({ name: title, value: id }))
  
      db.fullNameQuery().then(([rows]) => {
        const NameList = rows.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
  
        inquirer.prompt([
          {
            type: 'list',
            name: 'EmpNameRoleUpdate',
            message: 'Which employee would you like to update?',
            choices: NameList
          },
          {
            type: 'list',
            name: 'roleUpdate',
            message: "Choose the role ID to assign to employee",
            choices: roles
          },
  
  
        ]).then((res) => {
          db.updateRole(res)
            .then(() => {
              console.log(`\nNew role successfully added!\n`)
  
              menuPrompt()
            })
        })
      });
    })
  }

const quitApp = function () {
    process.exit()
}