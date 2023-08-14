
var express = require('express');
var router = express.Router();
const { Admin } = require('../modals/admin');
const { db } = require('../database/sql');


router.get('/', (req, res) => {
    Admin.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
router.post('/admin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ message: 'Admin not found' });
      }
  
      const isPasswordValid = await compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.json({ message: 'Admin login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
