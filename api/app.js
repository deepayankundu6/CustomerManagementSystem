var createError = require('http-errors');
var express = require('express');
var path = require('path');
const PORT = 5000;
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

var mongoDB = require('./mongoDB/controller');
var customers = require('./Controller/customers');
var states = require('./Controller/states');
var users = require('./Controller/login');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// creates mongo DB connection

console.log("Initializing Database started");
mongoDB.initializeDatabase();
console.log("Initialization finished");

/* GET home page. */
router.get('/health', (req, res) => {
    res.send("OK API is running fine");
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

router.post('/customer/create', customers.createCustomer);
router.get('/customer/getall', customers.fetchAllCustomer);
router.post('/customer/get', customers.fetchCustomer);
router.post('/customer/update', customers.modifyCustomer);
router.post('/customer/delete', customers.deleteCustomer);

router.get('/states/getdistrict/:state', states.getDistrict);
router.get('/states/getstates', states.getStates);

router.post('/user/verify', users.verifyLogin);
router.post('/user/create', users.createUser);
router.post('/user/remove', users.deleteUser);
router.post('/user/modify', users.modifyUser);
router.get('/user/getall', users.fetchAllUsers);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = app;