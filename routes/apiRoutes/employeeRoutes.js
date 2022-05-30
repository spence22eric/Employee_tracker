const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all employee with role info
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id`

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// get single employee with role info
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee                
                LEFT JOIN role
                ON employee.role_id = role.id
                WHERE employee.id = ?`
    const params = req.params.id

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// create employee
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id'
    );    
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                VALUES (?, ?, ?)`

    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
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

router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(
        req.body,
        'role_id'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE employee SET role_id = ?
                WHERE id = ?`
    const params = [
        req.body.role_id,
        req.params.id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
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