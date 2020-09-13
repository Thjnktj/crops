const moongose = require('mongoose');

const db = moongose();

const url = 'mongodb+srv://LeThinh:'
            + process.env.MONGODB_PASS +
            '@cluster0.jcorh.mongodb.net/'
            +process.env.MONGODB_DATABASE+
            '?retryWrites=true&w=majority';
const options ={
    useMongoClient: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

db.connect(url, options).catch(error => handleError(error));

module.exports = db;