const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

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

module.exports = router;