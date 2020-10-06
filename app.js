const { auth } = require('./src/middleware/auth');
let express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	
let apiRoutes = require("./routes")

let app = express();

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
