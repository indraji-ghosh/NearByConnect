import jwt from 'jsonwebtoken';

const generateToken = (user) =>{
    const payload = {
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1w'}); 
}

export {generateToken};