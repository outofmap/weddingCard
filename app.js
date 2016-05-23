var express = require('express');
var app = express();
var bodyparser = require('body-parser').urlencoded({extended:true});
var formidable = require('formidable');
var path = require('path');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

app.use(bodyparser);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pics', express.static(path.join(__dirname, 'uploads')));
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
var imageUrl = "./img/";

var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    database : 'wedding',
    password : 'insideout1209'
});

app.get('/',function(req,res){
    res.render('index');
});
app.get('/upload', function (req,res) {
    res.render('upload');
});

app.post('/writeMessage', function (req,res) {
    var name = req.body.name;
    var password = req.body.password;
    var message = req.body.message;
    bcrypt.hash(password,null ,null,function (err,hash) {
        //store pw to DB
        console.log("after bcrypt:"+hash);
        var post  = {name: name, password: hash, letter:message};
        console.log("name"+name);
        console.log("pw"+password);
        console.log("메시지"+message);
        pool.getConnection(function (err,connection) {
            var query = connection.query('INSERT INTO post SET ?', post, function (err, result) {
                res.json({
                    "name":name, "message":message
                });
                connection.release();
            });
            console.log(query.sql);
        });
    });

});
// bcrypt.compare('word',디비에서 가져온 password,function (err,res) {
//     if(err){
//         console.log("error");
//     }else if(res){
//         console.log("password is true.");
//         console.log("res:"+res);
//     }else{
//         console.log("password not matched.");
//     }
// });

app.get('/gallery', function(req,res){
    pool.getConnection(function(err, connection) {
        connection.query( 'SELECT filename from image', function(err, rows) {
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

    form.on('end',function(){
        pool.getConnection(function(err, connection) {
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
