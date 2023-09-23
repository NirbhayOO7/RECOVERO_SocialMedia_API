const mongoose = require('mongoose');
let db;

// establish connection with locally hosted mongodb database name Recovero
main().catch(err => console.log(err));

async function main() {
    try {
        db=await mongoose.connect('mongodb://127.0.0.1:27017/Recovero');
    } catch (error) {
        console.log('Error connecting to database', err);
        return;
    }
}

module.exports = db;