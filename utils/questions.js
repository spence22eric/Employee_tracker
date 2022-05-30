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
            
        });

}