const postResolvers = require('./post');
const userResolver = require('./user');
const commentResolver = require('./comments');

module.exports = {
    Post:{
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        commentCount(parent){
            console.log(parent);
            return parent.comments.length;
        }
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResolvers.Mutation,
        ...commentResolver.Mutation
    }
}