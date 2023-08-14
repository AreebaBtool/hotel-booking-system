// const express = require('express');
// const router = express.Router();
// const Bookings = require('../modals/booking');
// const Rooms=require('../modals/hotelrooms');
// const stripe = require('stripe')('sk_test_51Naw4zGClg2jznXpxKGPBTg1W1tWluctkjo9HY0dvM9LQ1vqY3StzKMsgAt0j8kpavT7i2BFAOrXfYDKTKgHzTON000JBzMk7D')
// router.post('/', async (req, res) => {

//     // const {name} = req.body

//     const {
//         data,
//         roomid,
//         userid,
//         fromdate,
//         todate,
//         totaldays,
//         totalamount, token
//     } = req.body
//     console.log(data, roomid,userid,fromdate, todate,totaldays,totalamount, token)
//     try {
//         const newbooking = new Bookings ({

//             data: data.name,
//             roomid: data.roomid,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totaldays,
//             transactionId: '1234'
//             // data: data.name,
//             // roomid: data._id,
//             // userid: '64d14cb98ed550beaa10ca96',
//             // fromdate: fromdate,
//             // todate: todate,
//             // totalamount: totalamount,
//             // totaldays: totaldays,
//             // transactionId: '1234'

//         })
//         // console.log(req.body)
//         const booking = await newbooking.save();
//         res.send('Room booked succesfully')
//     } catch (error) {
//         return res.status(400).json({ error });
//     }


// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// // const { nodemailer, transporter } = require('../nodemailer/nodemailer')
// const { db } = require('../database/sql')

// var storage = multer.diskStorage(
//     {
//         destination: function (req, file, cb) {
//             cb(null, "./public/images/")
//         },
//         filename: function (req, file, cb) {
//             cb(null, Date.now() + file.originalname);
//         }
//     }
// )
// var upload = multer({ storage });


// router.post('/', upload.single("profileImg"), (req, res, next) => {
//     const name = req.body.name;
//     const roomid = req.body.roomid;
//     const userid = req.body.userid;
//     const fromdate = req.body.fromdate;
//     const todate = req.body.todate;
//     const totalamount = req.body.totalamount;
//     const totaldays = req.body.totaldays;
//     const transactionId = req.body.transactionId;
//     const status = req.body.status;
//     const data = {
//         "name": name,
//         "roomid": roomid,
//         "userid": userid,
//         "fromdate": fromdate,
//         "todate": todate,
//         "totalamount": totalamount,
//         "totaldays": totaldays,
//         "transactionId": transactionId,
//         "status": status,
//     }
//     db.collection('bookings').insertOne(data, (err, result) => {
//         if (err) throw err;
//         else {
//             console.log("data added");
//             res.redirect('http://localhost:3000/')
//         }
//     })
// })
// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { nodemailer, transporter } = require('../nodemailer/nodemailer')
const { db } = require('../database/sql')
const Rooms = require('../modals/hotelrooms')
const stripe = require('stripe')('sk_test_51Naw4zGClg2jznXpxKGPBTg1W1tWluctkjo9HY0dvM9LQ1vqY3StzKMsgAt0j8kpavT7i2BFAOrXfYDKTKgHzTON000JBzMk7D')
const { v4: uuidv4 } = require('uuid');

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

router.post('/', upload.single("profileImg"), async (req, res) => {
    const {
        profileImg,
        username,
        email,
        phonenumber,
        data,
        roomid,
        fromdate,
        todate,
        totaldays,
        totalamount,
        maxcount,
        token
    } = req.body

    try {
        const customer = await stripe.customers.create(
            {
                email: token.email,
                source: token.id
            }
        )
        const payment = await stripe.charges.create({

            amount: totalamount * 100,
            customer: customer.id,
            currency: 'pkr',
            receipt_email: token.email
        },
            {
                idempotencyKey: uuidv4()
            }

        )
        if (payment) {

            const mailoption = {
                from: `Luxuary Hotel  <areebabatool75@gmail.com> `,
                to: email,
                subject: "Room Booked",
                html: `<p>Congratulations! <br> We have received your payment.Room is booked for you now. <br> In case of any issue please contact us. <br> Thanks.</p>`
            }
            const data1 = {
                "profileImg": profileImg,
                "username": username,
                "email": email,
                "phonenumber": phonenumber,
                "data": data,
                "roomid": roomid,
                "fromdate": fromdate,
                "todate": todate,
                "totalamount": totalamount,
                "totaldays": totaldays,
                "maxcount": maxcount,
                "transactionId": '1234'
            }
            db.collection('bookings').insertOne(data1, (err, result) => {
                if (err) throw err;
                else {
                    // const roomtemp=await Rooms.findOne({_id:roomid});
                    console.log("Room booked Successfully");
                    transporter.sendMail(mailoption, (error, info) => {
                        if (error) throw (error);
                        else {
                            console.log('email send')
                        }
                    })
                    // res.send("Payment is successfull.Your Room is booked.")
                    res.redirect('http://localhost:3000/');
                }

            })
        }

        // res.send("Payment is successfull.Your Room is booked.")

    } catch (error) {
        return res.status(400).json({ error });
    }

    // console.log(profileImg,data, roomid,username, email,phonenumber, fromdate, todate, totaldays, totalamount, token)

})
module.exports = router;
