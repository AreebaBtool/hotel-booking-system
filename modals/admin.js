// const mongoose = require("mongoose");

// const Admin = mongoose.model('admin', {
//     name: {
//         type: String,
//         required: true,
//     },

//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     isAdmin:{
//         type:Boolean,
//         default:false,
//     }
// })
// module.exports =  Admin ;


const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
},
  isAdmin: {
    type: Boolean,
    default: true
  }
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;


