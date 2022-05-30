const questions = require('../../utils/questions');
const cTable = require('console.table');

function queryDepartments(db) {

    const sql = `SELECT * FROM department ORDER BY name`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
    });
};

function queryRoles(db) {

    const sql = 'SELECT * FROM role ORDER BY title';

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
    });
}

function queryEmployees(db) {
    const sql = `SELECT * FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
    });
}

module.exports.queryDepartments = queryDepartments;
module.exports.queryRoles = queryRoles;
module.exports.queryEmployees = queryEmployees;