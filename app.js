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
app.set('port',process.env.PORT || 80);
app.set('view engine','ejs');
var imageUrl = "./img/";

var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    database : 'mydb',
    password : 'insideout'
});

app.get('/',function(req,res){
    pool.getConnection(function(err, connection) {
    // Use the connection
    	if(err){
    		console.log("mysql error");
    		throw err;
    	}
        connection.query( 'SELECT * FROM post ORDER BY time DESC LIMIT 2', function(err, rows) {
            console.log(rows);
            res.render('index',{posts : rows});
            connection.release();
        });
    });
});
// bcrypt.compare('asdf','$2a$10$SFWJRJ.IeQXJxvYcEACrS./sVQ3q2UNlUGO1HJKF5k1KxD6Aq3sUe',function (err,res) {
//     if(err){
//         console.log("error");
//     }else if(res){
//         console.log("password is true.");
//         console.log("res:"+res);
//     }else{
//         console.log("password not matched.");
//     }
// });
app.get('/upload', function (req,res) {
    res.render('upload');
});

app.get('/all',function (req,res) {
    pool.getConnection(function(err, connection) {
    // Use the connection
        connection.query( 'SELECT * FROM post ORDER BY time DESC', function(err, rows) {
            console.log(rows);
            res.render('all',{posts : rows});
            connection.release();
        });
    });
})

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
	    if(err) {
	    	console.error(err);
		throw err;
	    }
            var query = connection.query('INSERT INTO post SET ?', post, function (err, result) {
                res.redirect('/');
                connection.release();
            });
            console.log(query.sql);
        });
    });
});

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
    console.log("upload in");
    var form = new formidable.IncomingForm();
    var filename;
    console.log("upload next"+form);

    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log('fields' + fields);
        console.log('files' + files);
    });
    form.on('fileBegin', function (name, file) {
        console.log("file"+file);
        file.path = __dirname +'/uploads/'+ file.name;
        //DB에는 file.name를 저장
        filename = file.name;
        console.log("filename:"+filename);

    });
    form.on('end',function(){
        pool.getConnection(function(err, connection) {
            connection.query( 'INSERT INTO image SET filename = ?', filename , function(err, rows) {
                res.redirect('/success');
                connection.release();
            });
        });
    });
    form.on('error', function(err){

        console.log("upload err " + err);
    });
});

app.get('/success', function (req,res) {
    res.render('success');
});

app.listen(app.get('port'),function () {
    console.log('Express started on http://localhost'+
    app.get('port')+';press ctrl+C to terminate');
});
