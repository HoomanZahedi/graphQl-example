const {model,Schema} = require('mongoose');

const UserSchema = new Schema({
    userName: String,
    password: String,
    email:String,
    createdAt:String
})

module.exports = model("User",UserSchema)