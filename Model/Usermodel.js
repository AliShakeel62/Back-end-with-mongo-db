const mongoose = require("mongoose")
const userSchma = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "firstname is required"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: [true, "email is required"],
        uniqe: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
        type: String,
        require: [true, "password is required"],
        minlenght: [6, "Passward at least 6 characters long"],
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    },
})
const usermodel = mongoose.model("Users", userSchma);
module.exports = usermodel;