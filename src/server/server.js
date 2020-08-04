const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require('multer');

const path = require("path")

var app = express();
app.use(
  session({
    key: 'user_sid',
    name: "_es_demo", // The name of the cookie
    secret: "1234", // The secret is required, and is used for signing cookies
    resave: false, // Force save of session for each request.
    saveUninitialized: true, // Save a session that is new, but has not been modified
    cookie: {
      maxAge: 1000 * 60 * 5
    }
  })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static("dist"));

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render('page', {});
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage }).single('file')

app.post("/upload", function(req, res){
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
  return res.status(200).send(req.file)

  })
})

var server = app.listen(process.env.PORT || 8080, () => {
  console.log("listens to 8080");
});

console.log("end of file");
