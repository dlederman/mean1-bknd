var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var database;

app.use(bodyParser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
});

app.post('/api/message', function(req,res){
    console.log(req.body);
    database.collection('messages').insertOne(req.body);
    res.status(200);
});

mongo.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("mongo looks good");
        database = db;
    }

    //from back-end run 'node server.js'
    //from mongo /bin run 'mongod' to run mongo server, see expecting connections to 27017
    //from mongo /bin run 'mongo' to get access to Mongo shell
    //db.messages.find()
});

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
});
