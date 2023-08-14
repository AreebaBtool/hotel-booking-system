const express = require('express');
const router = express.Router();
const multer = require('multer');
const { nodemailer, transporter } = require('../nodemailer/nodemailer')
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
    const email = req.body.email;
    const password = req.body.password;
    // const file = req.file.filename;
    const mailoption = {
        from: `Luxuary Hotel <areebabatool75@gmail.com> `,
        to: email,
        subject: "You have been Registered",
        html: `<p>You have been Registered:) </p>`
    }
    const data = {
        "name": name,
        "email": email,
        "password": password,
        // "profileImg": file,
    }
    db.collection('users').insertOne(data, (err, result) => {
        if (err) throw err;
        else {
            console.log("data added");
            transporter.sendMail(mailoption, (error, info) => {
                if (error) throw (error);
                else {
                    
                    console.log('email send')
                }
            })
            // res.redirect('http://localhost:3000/login')
        }
    })

})
module.exports = router;
