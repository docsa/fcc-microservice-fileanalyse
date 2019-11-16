'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require("express-fileupload")

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.use(fileUpload({
    createParentPath: true
}));

app.use("/", bodyParser.urlencoded({extended: false}));


app.post('/api/fileanalyse' , function(req, res) {
  try {
        if(!req.files) {
            res.send({
                message: 'No file uploaded'
            });
        } else {
            let upFile = req.files.upfile;
            
            //send response
            res.send({
                    name: upFile.name,
                    type: upFile.mimetype,
                    size: upFile.size
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
