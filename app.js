const express = require("express");
const { endpoints } = require("./routes/routes");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

require('./config/database');

app.use(helmet());
app.use(cors());
app.use(logger("dev"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// app.listen(PORT, (error) => {
//   if (!error) console.log("Server started on Port: " + PORT);
//   else console.log("Error in starting server", error);
// });

app.get("/", (req, res) => {
  res.json({
    data: "working fine",
  });
});

// Authentication and Authorization Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

  // eslint-disable-next-line global-require
  // const auth = require('./middleware/auth');
  // auth.auth(req, res, next);
  next();
});

app.use("/api/v1", require("./routes/routes"));

const server = app.listen(process.env.PORT || PORT, (error) => {
  if (!error) console.log("Server started on Port: " + PORT);
  else console.log("Error in starting server", error);
});


// const io = require('socket.io')

// io.on('connection', (socket) => {
//   // eslint-disable-next-line no-console
//   console.log('User connected');
//   socket.on('disconnect', () => {
//     // eslint-disable-next-line no-console
//     console.log('User disconnected');
//   });
//   socket.on('save-message', (data) => {
//     // eslint-disable-next-line no-console
//     console.log('received new message');
//     io.emit('task-status', { message: data });
//   });
// });
