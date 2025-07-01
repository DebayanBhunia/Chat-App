import jwt from "jsonwebtoken";
export const generateToken = (userId,res)=>
{    const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d"
})      //function to create a token
res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000,  //miliseconds age
    httpOnly:true,  //token not accesible via javascript
    sameSite:"strict",   //prevents cookie from being sent in cross site requests
    secure: process.env.NODE_ENV!=="development"    //true means https false if http
}) 
return token;
};
