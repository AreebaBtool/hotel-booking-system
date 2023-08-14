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
    const guests=req.body.guests;
    const adate=req.body.adate;
    const ddate=req.body.ddate;
    const notes=req.body.notes;
    
    // const file = req.file.filename;
    const mailoption = {
        from: `Luxuary Hotel <areebabatool75@gmail.com> `,
        to: email,
        subject: "Response Alert!",
        html: `<p>Received with Thanks! <br> Your Response is successfully received.Our team will contact you soon! <br> Get in touch with us! <br> Thanks in Advance:) </p>`
    }
    const data = {
        "name": name,
        "email": email,
        "guests": guests,
        "adate": adate,
        "ddate": ddate,
        "notes": notes,
    }
    db.collection('contact').insertOne(data, (err, result) => {
        if (err) throw err;
        else {
            console.log("data added");
            transporter.sendMail(mailoption,(error,info)=>{
                if(error) throw(error);
                else{
                    console.log('email send')
                }
            })
            // res.redirect('http://localhost:3000')
        }
    })

})
module.exports = router;
