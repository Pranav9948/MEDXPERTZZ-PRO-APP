import Jwt from "jsonwebtoken";
import USER from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const Protect=asyncHandler(async(req,res,next)=>{

    const token=req.cookies.jwtToken

    try{
       
    const decoded=Jwt.verify(token,process.env.JWT_SECRET)

     if(decoded){

    req.user=await USER.findById(decoded.userId).select('-password')

    next()

     }

     else {
  
        res.status(401)
        throw new Error('not authorized  token failed')
     }

    }

    catch(err){

        res.status(401)
        throw new Error('not authorized no token')
    }

})


const Admin=asyncHandler(async(req,res,next)=>{

    

    try{
       
    

     if(req.user && req.user.isAdmin){

        next()

     }

     else {
  
        res.status(400)
        throw new Error('not authorized as admin ')
     }

    }

    catch(err){

        res.status(400)
        throw new Error('not authorized')
    }

})



const Doctor=asyncHandler(async(req,res,next)=>{

    

    try{
       
    

     if(req.user && req.user.isDoctor){

        next()

     }

     else {
  
        res.status(400)
        throw new Error('not authorized as doctor ')
     }

    }

    catch(err){

        res.status(400)
        throw new Error('not authorized')
    }

})


export {

    Protect,Admin,Doctor
}