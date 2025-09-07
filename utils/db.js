const mongoose = require('mongoose')

// const URI = 'mongodb://127.0.0.1:27017/estate'

// %40 @ | %24 $

const URI = process.env.MONGODB_URI

// mongoose.connect(URI)

const connectDb = async (req, res) => {
    try {
        await mongoose.connect(URI);
        const db = mongoose.connection;
        // db.on('error' , console.error.bind(console, "Connection Error"))
        // db.once('open', () => {
        //     console.log("Connected to MongoDb");
        // })
        // db.on('error', (error) => {
        //     console.error('MongoDB connection error:', error);
        // });

        // db.once('open', () => {
        //     console.log('Connected to MongoDB');
        // });
        console.log("Connected to database");
    } catch (error) {
        console.log(error + "cannot connect to the database");
        process.exit(0);
    }
}

module.exports = connectDb;