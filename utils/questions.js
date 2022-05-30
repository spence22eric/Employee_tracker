const inquirer = require('inquirer');


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
            console.log(answers);
        });

}