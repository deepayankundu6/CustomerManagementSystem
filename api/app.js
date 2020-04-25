var createError = require('http-errors');
var express = require('express');
var path = require('path');
const staticMiddleware = express.static("dist");
var cookieParser = require('cookie-parser');
const PORT = 5000;
var bodyParser = require('body-parser');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
)
var app = express();
var router = express.Router();
app.use(webpackDevMiddleware);
app.use(staticMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoDB = require('../api/mongoDB/controller');
var customers = require('./Controller/customers');
var states = require('./Controller/states');

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



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = app;