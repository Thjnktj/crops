const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

//set default
db.defaults({
    roles: [],
    users: [],
    news: [],
    typeNews: [],
    comments: [],
    crops: [],
    types: [],
    seeds: []
}).write();

module.exports = db