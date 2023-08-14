const mongoose = require("mongoose");

const Bookings = mongoose.model('bookings', {

    name: {
        type: String,
        required: true,
    },
    roomid: {
        type: String,
        required: true,
    },
    username: {
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
    fromdate: {
        type: String,
        required: true,
    },
    todate: {
        type: String,
        required: true,
    },
    totalamount: {
        type: Number,
        required: true,
    },
    totaldays: {
        type: Number,
        required: true,
    },
     transactionId: {
        type: String,
        required: true,
    },
    profileImg: [],
    status: {
        type: String,
        required: true,
        default:'booked'
    },
}
)
module.exports = { Bookings };
