import { updateUserCityandAddress,addNewUser,searchById,deleteUserByID,testUserApi } from "../Controller/userFunctions.js";
import express from 'express'

export const userRouter = express.Router()

userRouter.get("/test/:id1/:id2",testUserApi);
userRouter.get("/user/search/:id",searchById);
userRouter.post("/user/add",addNewUser);
userRouter.put("/user/update/:id",updateUserCityandAddress);
userRouter.delete("/user/delete/:id",deleteUserByID);