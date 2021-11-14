const mongoose = require('mongoose');
require('dotenv').config();

let database = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  database = process.env.MONGO_URI_TEST;
} else {
  database = process.env.MONGO_URI;
}

const connectDB = async () => {
  const conn = await mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
