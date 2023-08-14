const mongoose = require("mongoose");


const Contact = mongoose.model('contact', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    adate:{
        type:Date,
         required: true,
    },
     ddate:{
        type:Date,
         required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

module.exports = { Contact };
