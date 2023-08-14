const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { nodemailer, transporter } = require('../nodemailer/nodemailer')
const { db } = require('../database/sql')

var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/images/")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    }
)
var upload = multer({ storage });


router.post('/', upload.single("profileImg"), (req, res, next) => {
    const name = req.body.name;
    const type = req.body.type;
    const rentperday = req.body.rentperday;
    const maxcount = req.body.maxcount;
    const description = req.body.description;
    const currentbookings = req.body.currentbookings
    const file = req.file.filename;
    const phonenumber = req.body.phonenumber;
    const data = {
        "name": name,
        "type": type,
        "rentperday": rentperday,
        "maxcount": maxcount,
        "description": description,
        "phonenumber": phonenumber,
        "currentbookings": currentbookings,
        "profileImg": file,
    }
    db.collection('rooms').insertOne(data, (err, result) => {
        if (err) throw err;
        else {
            console.log("data added");
            res.redirect('http://localhost:3000/rooms')
        }
    })
})
module.exports = router;
