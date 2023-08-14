var express = require('express');
var router = express.Router();
const { Bookings } = require('../modals/booking');
const { db } = require('../database/sql');


router.get('/', (req, res) => {
    Bookings.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
router.get('/:_id', (req, res) => {
    Bookings.find({_id:req.params._id}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
module.exports = router;
