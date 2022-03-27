const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/inventory';
mongoose.Promise = global.Promise;
module.exports = mongoose;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log(`Connected to Database ${mongoDB}`);
});

// On Error
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Database error ${err}`);
});
