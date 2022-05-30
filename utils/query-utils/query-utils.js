const questions = require('../../utils/questions');
const cTable = require('console.table');

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

function addDepartment(db, answers) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [
        answers.addDepartment
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`you have added ${answers.addDepartment} to the departments`);
        return questions();
    });
    // console.log(answers.addDepartment);
}

module.exports.queryDepartments = queryDepartments;
module.exports.queryRoles = queryRoles;
module.exports.queryEmployees = queryEmployees;
module.exports.addDepartment = addDepartment;