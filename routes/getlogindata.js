var express = require('express');
var router = express.Router();
const { Login } = require('../modals/login');
const { db } = require('../database/sql');

router.get('/', (err, res) => {
    Login.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});

router.get('/:email', (req, res) => {
    Login.findOne({ email: req.params.email }).select('_id name email').then((result) => {
        if (result) {
            console.log("Success")
            res.send(result);
        }
        else {
            console.log("not found");
        }
    })
});

module.exports = router;
