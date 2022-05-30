const questions = require('../../utils/questions');
const cTable = require('console.table');

// function verifyExists(db, answers) {
//     const sql = `SELECT * FROM department WHERE id=?`;
//     const params = [answers.roleDepartment];

//     db.query(sql, params, (err, row) => {
//         if (err) throw err;

//         if (!row || row == null || row == '') {
//             console.log('That department does not exist!');
//             return false;
//         } else {
//             return true;
//         }
//     });    
// }

// get all departments
function queryDepartments(db) {

    const sql = `SELECT * FROM department`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
};

// get all roles
function queryRoles(db) {

    const sql = 'SELECT * FROM role ORDER BY department_id';

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
}

// get all employees
function queryEmployees(db) {
    const sql = `SELECT * FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
}

// create new department
function createDepartment(db, answers) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [
        answers.addDepartment
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`you have added ${answers.addDepartment} to the departments`);
        return questions();
    });
}

// create new role
function createRole(db, answers) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
    const params = [
        answers.addRole,
        answers.roleSalary,
        answers.roleDepartment
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`${answers.addRole} role created`)
        return questions();
    })
}

// create new employee
function createEmployee(db, answers) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                VALUES (?, ?, ?)`

    const params = [
        answers.employeeFirstName,
        answers.employeeLastName,
        answers.employeeRole,
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        
        console.log(`${answers.employeeFirstName} ${answers.employeeLastName} added to the employee list`);
        return questions();
    });
}

function getEmployeeList(db) {
    const sql = `SELECT first_name, last_name FROM employee`

    db.query(sql, (err, rows) => {
        if (err) throw err;
        
    })
}

function updateEmployee(db, answers) {
    // const sql = `UPDATE employee SET role_id = ?
    //             WHERE id = ?`
    // const params = [
    //     req.body.role_id,
    //     req.params.id
    // ];

    // db.query(sql, params, (err, result) => {
    //     if (err) {
    //         res.status(400).json({ error: err.message });
    //         return;
    //     } else if (!result.affectedRows) {
    //         res.json({
    //             message: 'Employee not found'
    //         });
    //     } else {
    //         res.json({
    //             message: 'success',
    //             data: req.body,
    //             changes: result.affectedRows
    //         });
    //     }
    // });
}

module.exports.createRole = createRole;
module.exports.queryDepartments = queryDepartments;
module.exports.queryRoles = queryRoles;
module.exports.queryEmployees = queryEmployees;
module.exports.createDepartment = createDepartment;
module.exports.createEmployee = createEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.getEmployeeList = getEmployeeList;
// module.exports.verifyExists = verifyExists;