var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
var bodyparser = require('body-parser').urlencoded({extended:true});
var formidable = require('formidable');
var path = require('path');
var mysql = require('mysql');

app.use(bodyparser);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pics', express.static(path.join(__dirname, 'uploads')));
app.set('port',process.env.PORT || 3000);

app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');
// app.set('view engine', 'html');
app.get('/upload', function (req,res) {
    res.render('upload');
});
var imageUrl = "./img/";
var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'insideout1209',
    database : 'wedding'
});
app.get('/gallery', function(req,res){
    pool.getConnection(function(err, connection) {
    // Use the connection
        connection.query( 'SELECT filename from image', function(err, rows) {
        // And done with the connection. connection.release();
        // Don't use the connection here, it has been returned to the pool. });
            console.log(rows[0].filename);
            console.log(rows[1].filename);
            var images = [];
            for(var i =0; i < rows.length; i++){
                images[i] = rows[i].filename;
            }
            console.log(images[0]);
            console.log(images[1]);
            res.render('gallery',{images: images});
            connection.release();
        });
    });

});
app.post('/uploadIMG',function(req, res){
    var form = new formidable.IncomingForm();
    var filename;
    form.keepExtensions = true;
    form.on('fileBegin', function (name, file) {
        file.path = __dirname +'/uploads/'+ file.name;
        //DB에는 file.name를 저장
        filename = file.name;
        console.log("filename:"+filename);

    });
    form.on('progress', function(bytesReceived, bytesExpected) {
    });
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
        pool.getConnection(function(err, connection) {
        // Use the connection
            connection.query( 'INSERT INTO image SET filename = ?', filename , function(err, rows) {
                res.redirect('/sucess');
                connection.release();
            });
        });
    });
});

app.get('/sucess', function (req,res) {
    res.render('success');
});

app.listen(app.get('port'),function () {
  console.log('Express started on http://localhost'+
  app.get('port')+';press ctrl+C to terminate');
});
