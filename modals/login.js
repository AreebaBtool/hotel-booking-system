const mongoose = require("mongoose");

const Login=mongoose.model('logins',{

    email: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
})
module.exports={Login};