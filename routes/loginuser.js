const express = require('express');
const router = express.Router();
const { db } = require('../database/sql')
const Users = require('../modals/rooms');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    // console.log(user);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
      return res.json({ message: 'Login successful' });
   
    // return res.redirect('http://localhost:3000/hotelservices')
  }

  catch (error) {
    return res.status(400).json({ message: 'Internal server error' });
  }
});

module.exports = router;
