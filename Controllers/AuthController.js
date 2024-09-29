const usermodel = require("../Model/Usermodel");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const AuthController = {
    get: {},
    singup: async (req, res) => {
        try {
            let body = req.body;
            let obj = {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password,
            }
            let existinguser = await usermodel.findOne({
                email: body.email
            })
            if (existinguser) {
                res.status(409).send({
                    isSuccessfull: false,
                    data: null,
                    message: "User with this Email is already exists",
                });
                return
            } else {
                obj.password = await bcrypt.hash(obj.password, 10)
                let userobj = new usermodel(obj)
                userobj.save().then((result) => {
                    res.status(201).send({
                        isSuccessfull: true,
                        data: result,
                        message: "User Create sucessfully"
                    })
                }).catch((error) => {
                    res.status(500).send({
                        isSuccessfull: false,
                        data: null,
                        message: "Internal Server error"
                    })
                })

            }
        } catch (error) {
            res.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal Server error"
            })
        }
    },
    login: async (req, res) => {
        try{
            let body = req.body;
        let existinguser =await usermodel.findOne({
            email: body.email
        })
        if (!existinguser) {
            res.status(401).send({
                isSuccessfull: false,
                data: null,
                message: "Invalid Credentials",
            });
            return;
        } else {
            isCorrectPassword =await bcrypt.compare(body.password, existinguser.password);
            let Token = await jwt.sign( {...existinguser} ,process.env.SECURITY_KEY) ;
            if (isCorrectPassword) {
                res.status(200).send({
                    isSuccessfull: true,
                    data: existinguser,
                    token:Token ,
                    message:"User Login Successfully"
                })
            }
        }
        }catch(error){
            console.log(error);
            res.status(500).send({
              isSuccessfull: false,
              data: null,
              message: "Internal Server Error",
            });
        }
    },
    protected:async (req,res,next)=>{
        let token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            res.status(401).send({
                isSuccessfull: false,
                message: "User Unauthorized",
                data: null,
              });
              return;
        }

        const loggedInUser = await jwt.verify(token ,process.env.SECURITY_KEY )
        if (loggedInUser?._doc){
            next()
        }else {
            res.status(401).send({
              isSuccessfull: false,
              message: "User Unauthorized",
              data: null,
            });
          }
    }
};
module.exports = AuthController