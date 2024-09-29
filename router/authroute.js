const express = require("express");
const Route = express.Router();
const AuthController = require("../Controllers/AuthController")

Route.post("/singup",AuthController.singup)
Route.post("/login",AuthController.login)

module.exports = Route ;