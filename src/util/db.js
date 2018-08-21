const mongoose = require('mongoose');
const config = require('../config');

//mongoose.Promise = global.Promise
// 连接
mongoose.connect(config.DB_URL, {
    /*useMongoClient: true*/
});

const db = mongoose.connection;

// 连接成功
db.on('connected', function() {
    console.log('Mongoose connection open to ', config.DB_URL);
});

// 连接异常
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

// 断开连接
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = db;