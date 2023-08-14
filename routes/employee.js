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
    const phonenumber = req.body.phonenumber;
    const cnic = req.body.cnic;
    const salary = req.body.salary;
    const file = req.file.filename;
    const mailoption = {
        from: `Luxuary Hotel  <areebabatool75@gmail.com> `,
        to: email,
        subject: "Employee Registered",
        html: `<p>Congratulations!!You have been officially registered employee now:) </p>`
    }
    const data = {
        "name": name,
        "email": email,
        "cnic": cnic,
        "salary": salary,
        "phonenumber": phonenumber,
        "profileImg": file,
    }
    db.collection('employees').insertOne(data, (err, result) => {
        if (err) throw err;
        else {
            console.log("data added");
            transporter.sendMail(mailoption,(error,info)=>{
                if(error) throw(error);
                else{
                    console.log('email send')
                }
            })
            res.redirect('http://localhost:3000/employee')
        }
    })

})
module.exports = router;
