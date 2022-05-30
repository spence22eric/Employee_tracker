const inquirer = require('inquirer');
const getDepartments = require('../routes/apiRoutes/departmentRoutes');
const queryUtils = require('./query-utils/query-utils');
const db = require('../db/connection');


module.exports = function () {

    inquirer
        .prompt([
            {
                name: 'options',
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ]

            },
            {
                name: 'addDepartment',
                type: 'input',
                message: 'Please enter the name of the department you would like to add:',
                when: (answer) => {
                    if (answer.options == 'Add a department') {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: newDepartment => {
                    if (newDepartment) {
                        return true;
                    } else {
                        console.log('Please enter a valid department name.');
                        return false;
                    }
                }
            },
            {
                name: 'addRole',
                type: 'input',
                message: 'Please enter the name of the role you would like to add:',
                when: (answer) => {
                    if (answer.options == 'Add a role') {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: newRole => {
                    if (newRole) {
                        return true;
                    } else {
                        console.log('Please enter a valid role name.')
                    }
                }
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'Enter the role salary:',
                when: ({ addRole }) => {
                    if (addRole) {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: answer => {
                    if (isNaN(answer)) {
                        console.log('   Error: Please enter a number');
                        return false;
                    } else if (!answer) {
                        console.log('   Error: Please enter a number');
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                name: 'roleDepartment',
                type: 'input',
                message: 'Enter the associated department id:',
                when: ({ roleSalary }) => {
                    if (roleSalary) {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: answer => {
                    if (isNaN(answer)) {
                        console.log('Please enter a number id corresponding to an existing department.')
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                name: 'employeeFirstName',
                type: 'input',
                message: 'Enter employee\'s first name',
                when: answer => {
                    if (answer.options == 'Add an employee') {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: answer => {
                    if (isNaN(answer)) {
                        return true;
                    } else {
                        console.log(' This field cannot contain numbers')
                        return false;
                    }
                }
            },
            {
                name: 'employeeLastName',
                type: 'input',
                message: 'Enter employee\'s last name',
                when: ({ employeeFirstName }) => {
                    if (employeeFirstName) {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: answer => {
                    if (isNaN(answer)) {
                        return true;
                    } else {
                        console.log(' This field cannot contain numbers')
                        return false;
                    }
                }
            },
            {
                name: 'employeeRole',
                type: 'input',
                message: 'Please provide an existing role id for the new employee:',
                when: ({ employeeLastName }) => {
                    if (employeeLastName) {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: answer => {
                    if (isNaN(answer)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                name: 'updateEmployeeChoices',
                type: 'list',
                message: 'Which employee\'s role would you like to update?',
                when: (answer) => {
                    if (answer.options == 'Update an employee role') {
                        return true;
                    } else {
                        return false;
                    }
                },
                choices: []
            }
        ])
        .then(answers => {
            if (answers.options == 'View all departments') {
                queryUtils.queryDepartments(db);
            }

            if (answers.options == 'View all roles') {
                queryUtils.queryRoles(db);
            }

            if (answers.options == 'View all employees') {
                queryUtils.queryEmployees(db);
            }

            if (answers.options == 'Add a department') {
                queryUtils.createDepartment(db, answers);
            }

            if ((answers.roleSalary) && (answers.roleDepartment)) {
                queryUtils.createRole(db, answers);
            }

            if ((answers.employeeFirstName) && (answers.employeeLastName) && (answers.employeeRole)) {
                queryUtils.createEmployee(db, answers);
            }
        });
}