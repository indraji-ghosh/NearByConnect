import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) =>{
    const payload = {
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'}); 
}

export const generateRefreshToken = (user) =>{
    const payload = {
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'}); 
}

