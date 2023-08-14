const mongoose = require("mongoose");

const Rooms = mongoose.model('rooms', {

    name: {
        type: String,
        required: true,
    },
    maxcount: {
        type: Number,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    rentperday: {
        type: Number,
        required: true,
    },
    profileImg: [],
    currentbookings: [],
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}
)
module.exports = { Rooms };
