const mongoose = require("mongoose");

const adminnnSchema = new mongoose.Schema({

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
}
});

const Adminnn = mongoose.model('adminnn', adminnnSchema);

module.exports = Adminnn;


