var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var getUserRouter = require('./routes/getusers');
var getUserDataRouter = require('./routes/getdata');
var loginRouter = require('./routes/login');
var loginUserRouter = require('./routes/loginuser');
var adminUserRouter = require('./routes/adminuser');
var loginDataRouter = require('./routes/getlogindata');
var roomsRoute = require('./routes/rooms');
var adminRoute=require('./routes/admin');
var getadmindataRoute=require('./routes/getadmindata');
var employeeRouter=require('./routes/employee');
var getemployeedataRouter=require('./routes/getemployeedata');
var hotelRoomsRouter=require('./routes/hotelrooms');
var gethotelroomsdataRouter=require('./routes/gethotelroomsdata');
var contactRouter=require('./routes/contact');
var getContactRouter=require('./routes/getcontactdata');
var bookingRoute=require('./routes/bookings');
var getbookingRoute=require('./routes/getbookingdata');
var getpaymentRouter=require('./routes/payment');
const database = require('./database/sql');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://classy-tapioca-02df43.netlify.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Types');
  next();

})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/getusers', getUserRouter);
app.use('/api/rooms', getUserRouter);
app.use('/getdata', getUserDataRouter);
app.use('/getlogindata', loginDataRouter);
app.use('/login', loginRouter);
app.use('/loginuser', loginUserRouter);
app.use('/admin', adminRoute);
app.use('/adminuser', adminUserRouter)
app.use('/employee', employeeRouter);
app.use('/getemployeedata', getemployeedataRouter);
app.use('/hotelrooms', hotelRoomsRouter);
app.use('/gethotelroomsdata', gethotelroomsdataRouter);
app.use('/getadmindata',getadmindataRoute);
app.use('/contact',contactRouter);
app.use('/getcontactdata',getContactRouter);
app.use('/bookings',bookingRoute);
app.use('/getbookingdata',getbookingRoute);
app.use('/payment',getpaymentRouter);
// app.use('/gethotelroomsdata/:_id',gethotelroomsdataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Secure API key
function ValidateAPiKey(req, res, next) {
  const authkey = req.header('api-key');
  if (authkey && authkey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unathorized access' })
  }
}
app.use((req, res, next) => {
  if (req.path.startsWith('/images')) {
    return next();
  }
  ValidateAPiKey(req, res, next);
});





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
