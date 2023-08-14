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
// const multipleupload=upload.fields([{name:"profileImg"},{name:"profileImg2"}])

router.post('/', upload.single("profileImg"), (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(name,email,password);
    // const file = req.file.filename;
    const mailoption = {
        from: `Luxuary Hotel <areebabatool75@gmail.com> `,
        to: email,
        subject: "Admin Login",
        html: `<p>Admin Login Successfully! </p>`
    }
    const data = {
        "name": name,
        "email": email,
        "password": password,
        // "profileImg": file,
    }
    // if (name == "Areeba Shoaib" && email == "2020cs17@student.uet.edu.pk" && password == 'coder123') {
    //     console.log("valid admin");
    //     transporter.sendMail(mailoption, (error, info) => {
    //         if (error) throw (error);
    //         else {  
    //             console.log('email send')
    //         }
    //     })
    //     res.redirect('http://localhost:3000/rooms')
    // } else {
    //     console.log("Invalid admin");
    //     res.redirect('http://localhost:3000/admin')
    // }
    db.collection('admins').insertOne(data, (err, result) => {
        if (err) throw err;
        else {
            // if (name == "Areeba Shoaib" && email == "2020cs17@student.uet.edu.pk" && password == '123') 
            // {
                console.log("valid admin");
                console.log("data added");
                transporter.sendMail(mailoption, (error, info) => {
                    if (error) throw (error);
                    else {
                        console.log('email send')
                    }
                })
                res.redirect('http://localhost:3000/rooms')
            // } 
            // else {
                // console.log("Invalid admin");
                // res.redirect('http://localhost:3000/admin')
            // }
        }

    })


})
module.exports = router;




