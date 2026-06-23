import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Store from '../models/storeModel.js'



export const createStore = expressAsyncHandler(async(req,res)=>{
    //  Change 'name' to 'storeName' and 'items' to 'menuItems' to match Postman
    const { storeName, email, password, contact, address, menuItems } = req.body;

    if(!storeName || !email || !password || !contact || !address || !menuItems){
        res.status(400)
        throw new Error("Input field missing")
    }
    const existing = await Store.findOne({ email })
    if(existing){
        res.status(400)
        throw new Error("Store with this email exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const store = await Store.create({
      storeName,               
      email,
      password: hashedPassword,
      contact,
      address,
      menuItems,             
    })
    
    res.status(201).json({
        "message": "Store Created",
        "user": {
            "id": store._id,
            "Name": store.storeName,
            "email": store.email
        }
    })
})

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
    const store = await Store.findOne({email})
    if(!user){
        res.status(404)
        throw new Error("Store of given email not found")
    }
    const passMatch = await bcrypt.compare(password,store.password)
    if(!passMatch){
        res.status(401)
        throw new Error("Password Invalid")
    }
    const token = jwt.sign(
      { id: user._id, email: store.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_1EXPIRES }
    );
    res.json({
      message: "Login successful",
      token
    });
})


export const getProfile = expressAsyncHandler(async(req,res)=>{
    const store = await Store.findById(req.user.id).select("-password -__v").lean()
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    res.json({
        store
    })
})


