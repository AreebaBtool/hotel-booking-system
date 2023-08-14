var express = require('express');
var router = express.Router();
const { Employee } = require('../modals/employee')
const { db } = require('../database/sql');

router.get('/', (err, res) => {
    Employee.find({}).then((result) => {
        if (result) {
            res.send(result)
        }
        else {
            console.log("not found");
        }
    })
});
// router.delete('/:_id', (err, res) => {
//     const {id}=req.params;
//     Employee.findByIdAndDelete(req.params._id).then((result) => {
//         if (result) {
//             res.send(result)    
//         }
//         else {
//             console.log(req.params._id)
//             console.log("not found");
//         }
//         console.log(req.params._id)
        
//     })
// });


router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
      await Employee.findByIdAndDelete(_id);
      res.sendStatus(204); 
      console.log("Deleted successfully:");
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  });
module.exports = router;
