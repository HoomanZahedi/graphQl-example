const Post = require('../models/Post');
const checkAuth = require('../utils/check-auth');
const {UserInputError} =require('apollo-server')
 
module.exports={
    Query:{
        async getPosts(){
            try{
                const posts = await Post.find().sort({createdAt:-1})
                return posts
            }catch(err){
                throw new Error(err)
            }
        },
        async getPost(_,{postId}){
            try{
                const post = await Post.findById(postId);
                console.log('postId',post);
                if(post){
                    return post
                }else{
                    throw new Error('post not found')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:{
        async createPost(_,{body},context){
            const user = checkAuth(context);
            if(body.trim() === ''){
                throw new Error('you can not create empty post')
            }
            const newPost = await Post({
                body:body,
                userName:user.userName,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
        },
        async deletePost(_,{postId},context){
            console.log('postId',postId);
            const user = checkAuth(context);
            try{
                const post = await Post.findById(postId);
                if(post.userName === user.userName){
                    await post.delete();
                    return 'post has deleted successfully'
                }else{
                    throw new UserInputError('have no permition to delete post')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    }
}