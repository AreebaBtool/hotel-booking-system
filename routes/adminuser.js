const express = require('express');
const router = express.Router();
const { db } = require('../database/sql')
const Admin = require('../modals/admin');

router.post('/', async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    try {
        let user = await Admin.findOne({ email })
        if (user) {
            if (user.password == password) {
                res.status(200).json({
                    message: "Login Successfull",
                    user: user
                })
            } else {
                res.status(400).json({
                    message: "Invalid Password"
                })
            }
        } else {
            res.status(400).json({
                message: "Invalid Email"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

module.exports = router;