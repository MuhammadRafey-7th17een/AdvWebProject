import express from 'express'
import { userRouter } from './routes/userRoutes.js';
import { errorMiddleware } from './middleware/errormiddleware.js';
import mongoose from 'mongoose';
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT
app.use(express.json());
app.use("/user",userRouter);
app.use(errorMiddleware);
const url = process.env.Mongo_url
mongoose.connect(url).then(()=> console.log("Connection built with DB")).catch((err) => console.log("Db error "+err))
app.listen(PORT,()=>{
    console.log("Server running at "+ process.env.PORT)
})


