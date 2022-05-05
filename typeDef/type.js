const gql = require('graphql-tag');

module.exports =
    gql`
    type Post{
        _id:ID!
        body:String!
        userName:String!
        createdAt:String!
        comments:[Comment]!
        likes:[Like]!
        likeCount:Int!
        commentCount:Int!
    }
    type Comment{
        id:ID!
        body:String!
        createdAt:String!
        userName:String!
    }
    type Like{
        id:ID!
        userName:String!
        createdAt:String!
    }
    type User{
        id:ID!
        userName:String!
        email:String!
        token:String!
        createdAt:String! 
    }
    input RegisterInput {
        userName:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getPosts:[Post]
        getPost(postId:ID!):Post!
    }
    type Mutation {
        register(registerInput:RegisterInput):User!
        login(userName:String!,password:String!):User!
        createPost(body:String):Post!
        deletePost(postId:ID!):String!
        createComment(postId:ID!,body:String!):Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }
`;
