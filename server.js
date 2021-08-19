// WITH EXPLANATION
//import modules - using "require()" fn

const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

//in order to develop restful services,
//we need to create rest obj - by calling express()
//app is the rest obj now
const app = express();

//enable cors policy
app.use(cors()); //communication of ports enabled

//set the MIME type
//  - communication language between client & server
app.use(bodyparser.json());

//create the reference variable to connect to MongoDB
const connRef = mongodb.MongoClient;

//create POST request
app.post("/login", (req, res) => {
  //url pattern, callback(req, res) fn
  // req - whatever the data sent from angular - is stored in "req" obj
  // res - response to the client is sent using "res" obj

  connRef.connect(
    "mongodb+srv://admin:admin@miniproject.uefz0.mongodb.net/angular9pm?retryWrites=true&w=majority",
    (err, connection) => {
      if (err) throw err;
      else {
        const db = connection.db("angular9pm"); //creating db reference
        db.collection("login_tbl")
          .find({ "email": req.body.email, "password": req.body.password }) //comparing with email/password in MongoDB with the data coming from angular
          .toArray((error, arr) => {
            if (error) throw err;
            else {
              if (arr.length > 0) {
                res.send({ login: "success", length: arr.length});
              } else {
                res.send({ login: "fail", length: arr.length });
              }
            }
          });
      }
    }
  );
});
//assign the port number
app.listen(8080, () => {
  console.log("Server listening to port 8080..");
});

//to start the server: > node server

//test the rest api:

    // Postman:
    //     POST
    //     http://localhost:8080/login)
    //     Body -> raw data -> JSON 
    //     {
    //         "email" : "rspriya.173@gmail.com",
    //         "password" : "rspriya"
    //     }
