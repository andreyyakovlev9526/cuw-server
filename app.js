const { auth } = require('./src/middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
	
const apiRoutes = require("./routes")

const app = express();

app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).array('file')

app.post('/upload',function(req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })

});

// app.post(['/upload'], async (req, res) => {
//   try {
//     if(!req.files) {
//       res.send({
//         status: false,
//         message: 'Файл не выбран!'
//       });
//     } else {
//       //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//       let file = req.files.file;
//
//       //Use the mv() method to place the file in upload directory (i.e. "uploads")
//       file.mv('./uploads/' + file.name);
//
//       //send response
//       res.send({
//         status: true,
//         message: 'Файл загружен успешно!',
//         data: {
//           name: file.name,
//           mimetype: file.mimetype,
//           size: file.size
//         }
//       });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = app;
