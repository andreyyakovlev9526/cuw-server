const { auth } = require('./src/middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
	
const apiRoutes = require("./routes")

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/restApiDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost/jest", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
const db = mongoose.connection;

app.get('/', (_req, res) => {
	res.send("Express is running successfully!");
});

app.use('/api', apiRoutes);

module.exports = app;
