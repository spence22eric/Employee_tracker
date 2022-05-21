const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department ORDER BY name`

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

// get single department
router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id=?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        })
    })
});

// create a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'name'
    );
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [        
        body.name
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

// update a department
router.put('/department/:id', (req, res) => {
    const errors = inputCheck(req.body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE department SET name = ? WHERE id = ?`;
    const params = [req.body.name, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'department not found'
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