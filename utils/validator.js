const emailValidator = require('email-validator');
module.exports.validateRegisterUser=(userName,email,password,confirmPassword)=>{
    const errors={};
    if(userName.trim()===''){
        errors.userName = 'userName must not be empty';
    }
    if(email.trim()===''){
        errors.email = 'email must not be empty';
    }
    else if(emailValidator.validate(email)){
        errors.email='email is not valid';
    }
    if(password.trim() === ''){
        errors.password='password must not be empty'
    }else if(password !== confirmPassword){
        errors.password='confirmed password is not match'
    }
    return{
        errors,
        valid:Object.keys(errors).length?false:true
    }
}

module.exports.loginValidation=(userName,password)=>{
    const errors={};
    if(userName.trim()===''){
        errors.userName = 'userName must not be empty';
    }
    if(password.trim()===''){
        errors.password = 'password must not be empty';
    }
    return{
        errors,
        valid:Object.keys(errors).length?false:true
    }
}