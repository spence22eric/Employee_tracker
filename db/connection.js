const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'employees_db'
});

function insertDepartment() {
    const sql = `INSERT INTO department `
}

module.exports = db;