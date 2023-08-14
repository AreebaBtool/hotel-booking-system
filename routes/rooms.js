var express = require('express');
var router = express.Router();
const Rooms = require('../modals/rooms');

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Rooms.find({});
        res.send(rooms);
        // return res.json({ rooms });
    } catch (error) {
        return res.status(400).json({ message: err });
    }
});

module.exports = router;
