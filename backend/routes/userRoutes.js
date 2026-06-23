import { createUser, deleteUser, getProfile, login, searchByEmail,searchByPhoneNumber, updateEmail } from '../Controller/userController.js';
import express from 'express'
import rateLimit from 'express-rate-limit'
import { authMiddleware } from '../middleware/authMiddleware.js';
export const userRouter = express.Router()


/*const limiter = rateLimit({
    windowMs = 24 * 60 * 60 * 1000,
    max:(req,res)=>{
        if(req.user){
            return Number.MAX_SAFE_INTEGER
        }
        else{
            return 10
        }
    },
    standardHeaders = true,
    legacyHeaders = false
})*/
userRouter.get("/searchE/:email",searchByEmail)
userRouter.get("/searchP",searchByPhoneNumber)
userRouter.post("/create",createUser)
userRouter.put("/update/:id/:email",updateEmail)
userRouter.delete("/delete/:id",deleteUser)
userRouter.post("/login",login)
userRouter.get("/profile",authMiddleware,getProfile)



/*userRouter.get("/test/:id1/:id2",testUserApi);
userRouter.get("/user/search/:id",searchById);
userRouter.post("/user/add",addNewUser);
userRouter.put("/user/update/:id",updateUserCityandAddress);
userRouter.delete("/user/delete/:id",deleteUserByID);*/