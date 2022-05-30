const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all roles
router.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM role ORDER BY department_id';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// get one role by id
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id=?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// create role
router.post('/role', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'title',
        'salary',
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
    const params = [
        body.title,
        body.salary,
        body.department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// update role
router.put('/role/:id', (req, res) => {
    const errors = inputCheck(
        req.body,
        'title',
        'salary',
        'department_id'
    );

    const sql = `UPDATE role
                SET title = ?,
                salary = ?,
                department_id = ?
                WHERE id = ?`;
    const params = [
        req.body.title,
        req.body.salary,
        req.body.department_id,
        req.params.id
    ];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;