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
                message:' Please enter the name of the department you would like to add.',
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
                queryUtils.addDepartment(db, answers);               
            }            
        });

}