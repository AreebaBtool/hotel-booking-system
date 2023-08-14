const express = require('express');
const router = express.Router();
const { connection } = require('../database/sql');
const User = require('../modals/rooms');


router.get('/', (req, response) => {
    connection.query('SELECT * from register', (err, res) => {
        if (err) throw err;
        else {
            response.send(res);
        }
    })
})

module.exports = router;
