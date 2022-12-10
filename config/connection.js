const mongoose = require('mongoose');

const dbName = "snsData";
const connectionString =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  userUnifiedTopology: true
})

module.exports = mongoose.connection;
