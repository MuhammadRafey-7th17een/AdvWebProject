import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRegex = /^\+\d{1,3}-\d{3}-\d{7}$/

//Create
export const createUser = expressAsyncHandler(async(req,res)=>{
    const {fname,lname,email,password,contact,address} = req.body
    if(!fname||!lname||!email||!password||!address){
        res.status(400)
        throw new Error("Input feild missing")
    }
    if (!emailRegex.test(email) && !contactRegex.test(contact)) {
        res.status(400);
        throw new Error("Invalid email or contact format");
    }
    const exisiting = await User.findOne({email,contact})
    if(exisiting){
        res.status(400)
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({firstName:fname,lastName:lname,email,contact,password:hashedPassword,address})
    res.status(201).json({
    "message": "User created",
    "user": {
        "id": user._id,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
});
})

//Read
export const searchByEmail = expressAsyncHandler(async(req,res)=>{
    const email = req.params.email;
    
    if(!email){
        res.status(400)
        throw new Error("Email feild missing");
    }
   
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
        throw new Error("contact feild missing");
    }
    
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


//update

export const updateEmail = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    const newEmail = req.params.email
    if(!id||!newEmail){
        res.status(400)
        throw new Error("Input feilds missing")
    }
    if(!emailRegex.test(newEmail)){
        res.status(400)
        throw new Error("Invalid email format")
    }
    const user = await User.findByIdAndUpdate(id,{email:newEmail},{new:true,runValidators:true}).select("-__v").lean()
    if(!user){
        res.status(404)
        throw new Error("No user found by given id")
    }
    res.status(200).json({
        message:"Updated",
        user:user
    })
})

//delete

export const deleteUser = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(400)
        throw new Error("Input feild missing")
    }
    const user = await User.findByIdAndDelete(id)
    if(!user){
        res.status(404)
        throw new Error("User of given id not found")
    }
    res.status(204).json({
        message:`Deleted user ${user.firstName} ${user.lastName}`
    })
})


//login
export const login = expressAsyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        res.status(400)
        throw new Error("Input feild missing")
    }
    if(!emailRegex.test(email)){
        res.status(400);
        throw new Error("Invalid email format");
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(404)
        throw new Error("User of given email not found")
    }
    const passMatch = await bcrypt.compare(password,user.password)
    if(!passMatch){
        res.status(401)
        throw new Error("Password Invalid")
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.json({
      message: "Login successful",
      token
    });
})


export const getProfile = expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id).select("-password -__v").lean()
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    res.json({
        user
    })
})
