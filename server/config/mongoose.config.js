const mongoose = require('mongoose');
const dbName1 = process.env.DB_NAME1;
const dbName2 = process.env.DB_NAME2;

var conn1 = mongoose.createConnection("mongodb://127.0.0.1/" + dbName1, {useNewUrlParser: true, useUnifiedTopology: true})
var conn2 = mongoose.createConnection("mongodb://127.0.0.1/" + dbName2, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = {conn1, conn2}