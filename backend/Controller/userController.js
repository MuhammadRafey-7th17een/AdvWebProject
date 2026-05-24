import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'



export const searchByEmail = expressAsyncHandler(async(req,res)=>{
    const email = req.params.email;
    
    if(!email){
        res.status(400)
        throw new Error("Email feild missing");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }
    const result = await User.findOne({email}).select('-__v').lean();
    if(!result){
        res.status(404)
        throw new Error(`No user by ${email} found `)
    }
    res.status(200).json({
        message:"User found",
        user:{ id:result._id,firstName:result.firstName,lastName:result.lastName,}

    })

})

export const searchByPhoneNumber = expressAsyncHandler(async(req,res)=>{
    const contact = req.query.number;
    if(!contact){
        res.status(400)
        throw new Error("Email feild missing");
    }
    const contactRegex = /^\+\d{1,3}-\d{3}-\d{7}$/
    if(!contactRegex.test(contact)){
        res.status(400)
        throw new Error("Invalid contact format")
    }
    const result = await User.findOne({contact}).select('-__v').lean();
    if(!result){
        res.status(404)
        throw new Error(`No user by ${contact} found `)
    }
    res.status(200).json({
        message:"User found",
        user:{ id:result._id,firstName:result.firstName,lastName:result.lastName,}

    })

})

