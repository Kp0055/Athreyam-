import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

const generateToken =()=>{

    return jwt.sign({id: user._id, email: user.email } ,SECRET_KEY,{
        expiresIn: '1hr'
    });

};

const verifyToken = (token)=>{
    return jwt.verifyToken(token,SECRET_KEY)
}

export default {generateToken,verifyToken};