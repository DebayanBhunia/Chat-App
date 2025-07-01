import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";
import express from "express";

const app=express();
app.use(cookieParser());

export const protectRoute= async(req,res,next)=>
{   try{
        const token=req.cookies.jwt;   // retrieves token
        if(!token)      // if no token
        {   return res.status(401).json({message:"Unauthorised- No token authorization"});
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);    // decodes token and checksif its verified
        if(!decoded)
        {  return  res.status(401).json({message:"Unauthorised-Invali Token"});
        }
        const user = await User.findOne({ _id: decoded.userId }).select("-password"); //finds user from database using userId of decoded removes password
        if(!user)
        {  return res.status(401).json({message:"User not found"});  // not called mostly as user must be there if token is
        }
        req.user=user;
        next();  // calls the updateProfile function
    }
    catch(error)
    {   console.log("error in protectRoute middleware "+error.message);
        return  res.status(500).json({message:"Internal server error"});
    }
};