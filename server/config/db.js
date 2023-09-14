const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:1234@cluster0.cooyb5m.mongodb.net/sim');
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;