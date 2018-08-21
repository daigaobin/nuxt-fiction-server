let mongoose = require('../util/db');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: String,
    age: Number
}, { collection: 'User'})  // 需要加上collection指定表名，不然查出的数据是[]，mongoose的梗

let userModel = db.model('User',UserSchema);

module.exports = userModel;