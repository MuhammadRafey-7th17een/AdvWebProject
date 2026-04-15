import express from 'express'
import { userRouter } from './routes/userRoutes.js';
import { errorMiddleware } from './middleware/errormiddleware.js';
const app = express()
const PORT = 8080

app.use(express.json());
app.use("/api",userRouter);
app.use(errorMiddleware);
app.listen(PORT,()=>{
    console.log("Server running at "+PORT)
})


