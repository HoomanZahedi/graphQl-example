const jwt = require('jsonwebtoken');
const {SecretKey} = require('../typeDef/secret');
const {AuthenticationError} = require('apollo-server');

module.exports = context=>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(token){
            try{
                const user = jwt.verify(token,SecretKey);
                return user;
            }catch(err){
                throw new AuthenticationError('invalid token')
            }
        }
        throw new Error('invalid Authentication Header')
    }else{
        throw new Error('Authentication Header was not provided')
    }
}