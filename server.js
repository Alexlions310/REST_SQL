//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");

var app = express(); 

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initialising connection string
var dbConfig = {
  server: 'localhost\\ARONIUM',
  database: 'aroniumdb' ,
  user: 'sa',
  password:'1',
  port: 1433,
  "options": {
      "encrypt": true,
      "enableArithAbort": true
      }

};

//Function to connect to database and execute query
var executeQuery = function(req, res){             
  require('tls').DEFAULT_MIN_VERSION = 'TLSv1';  
  secure_socket = tls.TLSSocket(socket, options);

  sql.connect(dbConfig, function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(req, function (err, response) {
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
                console.log(response);
                res.send(response);
              }
          });
        }
    });           
}

//GET ALL ACTIVE USERS FOR PATHWAYS
app.get("/users", function(req, res){
     var query = "select * from Persons ";
     console.log(query);
     executeQuery(query, res);
});

//GET ONE USER
app.get("/users/:PersonID/", function(req, res){
  var query = "select * from Persons where PersonID = " + req.params.PersonID;
  executeQuery(query, res);
});

//Create new user
 app.post("/api/user", function(req , res){
                var value ="'"+ req.body.PersonID+"','"+req.body.Lastname+"','"+req.body.FirstName+"','"+req.body.Address+"','"+req.body.City+"'";
                console.log(value);
                var query = "insert into Persons  values ("+value+")";
                executeQuery (query,res);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE Persons SET FirstName= '" + req.body.FirstName  +  
                "' , LastName=  '" + req.body.LastName + "'  WHERE PersonID= '" + req.params.id+"'";
                executeQuery (query,res);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
                var query = "DELETE FROM Persons WHERE PersonID= '" + req.params.id+"'";
                executeQuery (query,res);
});