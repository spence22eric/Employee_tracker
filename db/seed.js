const mysql = require('mysql2');
const fs = require('fs');
const db = require('./connection');


const seedQuery = fs.readFileSync("db/seeds.sql", {
    encoding: 'utf-8',
});

db.connect();

db.query(seedQuery, err => {
    if (err) {
        throw err;
    }

    console.log("Seed completed!");
    db.end();
})
