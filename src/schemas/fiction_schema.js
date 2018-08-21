const mongoose = require('mongoose');

let fictionSchema = new mongoose.Schema({
    id: Number,
    href: String,
    thumbnails: String,
    bookName: String,
    author: String,
    type: String,
    subType: String,
    desc: String,
    latestChapter: String,
    source: String,
    updateTime: String,
}, {collection: 'fiction'})  // 需要加上collection指定表名，不然查出的数据是[]，mongoose的梗

module.exports = fictionSchema;