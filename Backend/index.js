import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
}));

app.use('/api/auth', authRoutes)

app.get('/', (_req, res)=>{
    res.send("<h1>Hello</h1>")
})

app.get("/api/test", (req, res) => {
  res.json({ message: "Server reachable" });
});



connectDB().then(() => {
    app.listen(3000, "0.0.0.0", ()=>{
        console.log("hello world <3000")
    })
})