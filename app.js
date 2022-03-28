const express = require("express");
const { endpoints } = require("./routes/routesV1");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Connect to the database
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

  const auth = require('./middleware/auth');
  auth.auth(req, res, next);
  next();
});

app.use("/api/v1", require("./routes/routesV1"));

const server = app.listen(process.env.PORT || PORT, (error) => {
  if (!error) console.log("Server started on Port: " + PORT);
  else console.log("Error in starting server", error);
});

