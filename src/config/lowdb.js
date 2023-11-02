const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const config = require('./config');

const adapter = new FileSync(config.jsonDb);
const db = low(adapter);

module.exports = db;
