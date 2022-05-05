const Post = require('../models/Post');
const checkAuth = require('../utils/check-auth');
const {UserInputError,AuthenticationError} = require('apollo-server');

module.exports={
    Mutation:{
        async createComment(_,{postId,body},context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(body.trim()===''){
                    throw new UserInputError('comment is empty',{errors:{
                        body:'comment is empty'
                    }})
                }else{
                    post.comments.unshift({
                        body,
                        userName:user.userName,
                        createdAt:new Date().toISOString()
                    });
                    await post.save();
                    return post;
                }
            }else{
                throw new UserInputError('post not found')
            }
        },
        async deleteComment(_,{postId,commentId},context){
            const user = checkAuth(context);
            const post = await Post.findById(postId);
            if(post){
                const postIndex = post.comments.findIndex(comment=>comment.id===commentId);
                if(post.comments[postIndex].userName===user.userName){
                    if(post.comments.find(comment=>comment.id===commentId)){
                        const commentList=post.comments.filter(comment=>comment.id!==commentId);
                        post.comments = commentList;
                        await post.save();
                        return post;
                    }else{
                        throw new UserInputError('comment was not found');
                    }
                }else{
                    throw new AuthenticationError('you have no permition');
                }
            }else{
                throw new UserInputError('post not found');
            }
        },
        async likePost(_,{postId},context){
            const user = checkAuth(context);
            const post = await Post.findById(postId);
            console.log(post);
            if(post){
                if(post.likes.find(like=>like.userName === user.userName)){
                    const likes =post.likes.filter(like=>like.userName !== user.userName);
                    post.likes=likes;
                }else{
                    post.likes.push({userName:user.userName,
                    createdAt:new Date().toISOString()})
                }
                await post.save();
                return post
            }else{
                throw new UserInputError('post not found');
            }
        }
    }
}