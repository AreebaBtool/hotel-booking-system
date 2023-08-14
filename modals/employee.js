const mongoose = require("mongoose");


const Employee = mongoose.model('employees', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    cnic: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

module.exports = { Employee };
