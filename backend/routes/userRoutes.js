import { createUser, deleteUser, searchByEmail,searchByPhoneNumber, updateEmail } from '../Controller/userController.js';
import express from 'express'

export const userRouter = express.Router()

userRouter.get("/searchE/:email",searchByEmail)
userRouter.get("/searchP",searchByPhoneNumber)
userRouter.post("/create",createUser)
userRouter.put("/update/:id/:email",updateEmail)
userRouter.delete("/delete/:id",deleteUser)



/*userRouter.get("/test/:id1/:id2",testUserApi);
userRouter.get("/user/search/:id",searchById);
userRouter.post("/user/add",addNewUser);
userRouter.put("/user/update/:id",updateUserCityandAddress);
userRouter.delete("/user/delete/:id",deleteUserByID);*/