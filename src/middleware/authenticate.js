
import jwt from "jsonwebtoken"
import  { RESPONSE } from "../config/global.js"

const authenticate = (req,res,next)=>{
    const token = req.headers["authorization"];
    let response;
    if(!token){
        return res.json(RESPONSE.ACCESS_DENIED);
    }
    try{
        const decoded = jwt.verify(token,process.env.TOKENKEY);
        req.user =decoded;
        next();
        
    }catch(err){
    response = RESPONSE.INVALID_DATA;
    return res.json({
        code:response.code,
        message:"access-token"+ response.message,
    });
    }
};
export default authenticate;