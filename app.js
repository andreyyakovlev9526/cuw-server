// const { auth } = require('./src/middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const apiRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/jest", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (_req, res) => {
	res.send("Express is running successfully!");
});

app.use('/api', apiRoutes);

const upload = multer({ dest: './public/uploads/' });

app.post('/upload', upload.single('asset'), (req, res) => {
    res.json(req.file);
});

module.exports = app;
