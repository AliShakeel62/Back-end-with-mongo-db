const express = require('express')
const App = express();
const userroutes = require('./router/userroutes')
const mongoose = require('mongoose')
const user = require("./Model/Usermodel");
const authroute = require("./router/authroute")
require("dotenv").config();
App.use(express.json())

App.use("/user", userroutes)
App.use("/user/:id", userroutes)
App.use("/auth",authroute)

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then((res) => {
    App.listen(process.env.port, () => {
      console.log(
      res,  `DB is Connected and Server is Listening on http://localhost:5000`
      );
    });
  })
  .catch((err) => {
    console.log(err, "DB Connection Error");
  });
//mongodb+srv://alishakeel:<db_password>@firstdatabase.xspod.mongodb.net/