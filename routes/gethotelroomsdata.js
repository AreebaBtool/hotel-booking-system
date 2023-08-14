var express = require('express');
var router = express.Router();
const { Rooms } = require('../modals/hotelrooms');
const { db } = require('../database/sql');


router.get('/', (req, res) => {
    Rooms.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
router.get('/:_id', (req, res) => {
    Rooms.findOne({ _id: req.params._id}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});

module.exports = router;
