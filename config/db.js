const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is connected...');
    } catch (error) {
        console.log('Error: ', error.message);
        process.exit(1);
    }
}


module.exports = connectDb;

