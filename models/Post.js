const {model,Schema} = require('mongoose');

const PostSchema = new Schema({
    body: String,
    userName: String,
    createdAt:String,
    comments:[
        {
            body: String,
            userName: String,
            createdAt:String,
        }
    ],
    likes:[
        {
            userName: String,
            createdAt:String,
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = model("Post",PostSchema)