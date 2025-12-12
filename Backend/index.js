import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes)

app.get('/', (_req, res)=>{
    res.send("<h1>Hello</h1>")
})



connectDB().then(() => {
    app.listen(3000, ()=>{
        console.log("hello world <3000")
    })
})