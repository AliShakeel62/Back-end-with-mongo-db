const express = require('express');
const Usercontroller = require('../Controllers/usercontroller');
const AuthController = require('../Controllers/AuthController');
const route = express.Router();
let arr = [{
    id: 1,
    firstname: "ali",
    lastname: "shakeel"
},
{
    id: 2,
    firstname: "ayan",
    lastname: "shakeel"
},
{
    id: 3,
    firstname: "ayan",
    lastname: "yousuf"
}, {
    id: 4,
    firstname: "naveed",
    lastname: "naseem"
},
{
    id: 5,
    firstname: "wasif",
    lastname: "jadon"
},];

route.get("/" , AuthController.protected , Usercontroller.Get);
route.get("/:id", Usercontroller.getbyid);

route.post("/",Usercontroller.add)
route.put("/:id",Usercontroller.update)
route.delete("/:id" , Usercontroller.del)
module.exports = route;
