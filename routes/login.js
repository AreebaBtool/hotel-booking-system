const express = require('express');
const router = express.Router();
const multer = require('multer');
const { nodemailer, transporter } = require('../nodemailer/nodemailer')
const { db } = require('../database/sql')
const User = require('../modals/rooms');


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

// router.post('/', upload.single("profileImg"), (req, res, next) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   const phonenumber = req.body.phonenumber;
  // console.log(name,email,password);
  // const file = req.file.filename;
  // const mailoption = {
  //   from: `Luxuary Hotel  <areebabatool75@gmail.com> `,
  //   to: email,
  //   subject: "You have been Login",
  //   html: `<p>You have been Login Successfully! </p>`
  // }
  // const data = {
  //   "name": username,
  //   "email": email,
  //   "password": password,
  //   "phonenumber": phonenumber
  //   // "profileImg": file,
  // }
  //   db.collection('logins').insertOne(data, (err, result) => {
  //       if (err) throw err;
  //       else {
  //           console.log("data added");
  //           transporter.sendMail(mailoption, (error, info) => {
  //               if (error) throw (error);
  //               else {
  //                   console.log('email send')
  //               }
  //           })
  //           res.redirect('http://localhost:3000/hotelservices')
  //       }
  //   })
  // })
  //     // connection.query('INSERT into register SET ?',data,(err,result)=>{
  //     //     if(err) throw err;
  //     //     else{
  //     //         console.log("Data Stored");
  //     // transporter.sendMail(mailoption,(error,info)=>{
  //     //     if(error) throw(error);
  //     //     else{
  //     //         console.log('email send')
  //     //     }
  //     // })
  //     //         //   result.redirect('http://localhost:3000');
  //     //     }
  //     // })


  //     // const file2=req.files.profileImg2[0].filename;
  //     // console.log(name, password, email,file);
  // })
// })
router.post('/', async (req, res) => {
  const { email,password} = req.body;
  // console.log(User.email);
  try {
    const user = await User.findAll({});
    console.log(user);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.json({ message: 'Login successful', user });
    //  return res.redirect('http://localhost:3000/hotelservices')
   }

  catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
