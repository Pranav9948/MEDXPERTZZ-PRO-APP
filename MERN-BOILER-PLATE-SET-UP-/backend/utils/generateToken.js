

import Jwt from "jsonwebtoken";


const generateToken=(res,userId)=>{

    const token= Jwt.sign({userId },process.env.JWT_SECRET,{expiresIn:'20D'})

    //set jwt as http only cookie
    
    const cookieParams={
    
     httpOnly:true,
     secure:process.env.NODE_ENV!=='development',
     sameSite:'strict',
     maxAge:30*24*60*60*1000
    }
    
    res.cookie('jwtToken',token,cookieParams)
    
}


export default generateToken