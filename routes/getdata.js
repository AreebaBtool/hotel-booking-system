var express = require('express');
var router = express.Router();
const Users  = require('../modals/rooms');
const { db } = require('../database/sql');

router.get('/', (err, res) => {
    Users.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
router.get('/:email', (req, res) => {
    Users.findOne({ email: req.params.email }).select('_id name email').then((result) => {
        if (result) {
            console.log("Success")
            res.send(result);
        }
        else {
            console.log("not found");
        }
    })
});



// router.post('/register', async (req, res) => {
//     const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
//     try {
//         const user = await newuser.save()
//         res.send('Register Succefully')
//     } catch (error) {
//         return res.status(400).json({ error });
//     }
// })
// router.post('/login', async (req, res) => {
//     const { name, email, password } = req.body;
//     const user = await User.findOne({ name: req.body.name, email: req.body.email, password: req.body.password })
// })

module.exports = router;
