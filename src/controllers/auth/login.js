import express from "express";
const router = express.Router();
import initTeacherModel from "../../model/teacherModel.js";
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt";
import constants from "../../config/constants.js";
import jwt from "jsonwebtoken";

router.post("/", async(req,res)=>{
    try{
        const teacherModel = await initTeacherModel();
        const {email,password } =req.body;
        let response;
        

        if(!email || email ==""){
            response=RESPONSE.MANDATORY_PARAMS;
             return res.json({
                code: response.code,
                message:"email" + response.message,
            });
        }

        

        if(!password || password ==""){
            response=RESPONSE.MANDATORY_PARAMS;
             return res.json({
                code: response.code,
                message:"password" + response.message,
            });
        }

        const isValidEmail = validator.isEmail(email);
        if(isValidEmail == false){
            response =RESPONSE.INVALID_DATA;

            return res.json({
                code: response.code,
                message:"email" + response.message,
            });
        }
        const data = await teacherModel.findOne({
            is_active : constants.STATE.ACTIVE,
            email: email,
        });
        // console.log(data);
        if(data &&  (await bcrypt.compare(password,data.password))){
            const token =jwt.sign({
                id:data._id,
                nmae: data.teacher_name,

            },
            process.env.TOKENKEY
        );
        

            response = RESPONSE.SUCCESS;
            return res.json({
                code: response.code,
                message:response.message,
                data:token,
            });

        }else{

            response = RESPONSE.INVALID_DATA;
            return res.json({
                code: response.code,
                message:"login credential"+response.message,
                data:token,
            });

        }
       
        
        
        
        
        
        
        // return res.json(RESPONSE.SUCCESS);



    }catch(err){
        console.log(err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
});

export default router;