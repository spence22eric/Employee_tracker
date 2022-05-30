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

function queryDepartments(db) {

    const sql = `SELECT * FROM department`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
};

function queryRoles(db) {

    const sql = 'SELECT * FROM role ORDER BY title';

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
}

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

module.exports.createRole = createRole;
module.exports.queryDepartments = queryDepartments;
module.exports.queryRoles = queryRoles;
module.exports.queryEmployees = queryEmployees;
module.exports.createDepartment = createDepartment;
// module.exports.verifyExists = verifyExists;