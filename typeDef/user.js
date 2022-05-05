const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {validateRegisterUser,loginValidation} = require('../utils/validator');
const bcrypt = require('bcryptjs');
const {SecretKey} = require('./secret');
const {UserInputError} =require('apollo-server')
const generateToken=(info)=>{
    const token = jwt.sign({
        id:info.id,
        email:info.email,
        userName:info.userName
    },SecretKey,{expiresIn:'1h'});
    return token;
}

module.exports={
    Mutation:{
        async login(_,{userName,password}){
            const{errors,valid}=loginValidation(userName,password);
            
            if(!valid){
                throw new UserInputError('validation error',{errors:errors.userName})
            }

            const findUser = await User.findOne({userName:userName});
            if(!findUser){
                errors.loginError = 'user has not exists';
                throw new UserInputError('login error',{errors:errors.loginError})
            }else{
                
                const matchPassword =await bcrypt.compare(password,findUser.password);
                if(!matchPassword){
                    errors.wrongPassword="wrong password"
                    throw new UserInputError('password error',{errors:errors.wrongPassword})
                }
            }
            const token =generateToken(findUser);
            return{
                ...findUser._doc,
                id:findUser._id,
                token:token
            }
        },
        async register(_,{
            registerInput:{ email,userName,password,confirmPassword }
        },
        context,
        info){
            const {errors,valid}=validateRegisterUser(email,userName,password,confirmPassword);
            if(!valid){
                throw new UserInputError('validation error',{errors:errors})
            }
            const existUser = await User.findOne({userName:userName});
            if(existUser){
                throw new UserInputError('user has already exist',{errors:{
                    userName:'userName has already exist'
                }});
            }
            const hashedPassword=await bcrypt.hash(password,8);
            const user = new User({
                userName:userName,
                password:hashedPassword,
                email:email,
                createdAt:new Date().toISOString()
            });
            const savedUser = await user.save();
            if(savedUser){
                const token=generateToken(savedUser);
                return{
                    ...savedUser._doc,
                    id:savedUser._id,
                    token:token
                }
            }
        }
    }
}