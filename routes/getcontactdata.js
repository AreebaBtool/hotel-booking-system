var express = require('express');
var router = express.Router();
const { Contact } = require('../modals/contact')
const { db } = require('../database/sql');

router.get('/', (err, res) => {
    Contact.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});

module.exports = router;
