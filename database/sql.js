const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://2020cs17:WSnonaQvQrmGo14t@tiersdatabase.2wfxf0c.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', () => console.log('error'));
db.once('open', () => console.log("Database Connected"));
module.exports = { db };

// const mysql = require('mysql');


// const connection = mysql.createConnection({
//     host: 'bkntk47u4khwcfcoggtu-mysql.services.clever-cloud.com',
//     database: 'bkntk47u4khwcfcoggtu',
//     user: 'unzspnxwnylkvv4e',
//     password: 'vCg4hyYmv5CALxl9GIQh',
//     port: 3306,
// })
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Database connected');
// })
// module.exports = { connection };