import express from "express";
const router = express.Router();
import constants from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middleware/authenticate.js";
import multer from "multer";
import image from "../../middleware/uploads.js";
import initstudentModel from "../../model/studentModel.js";
const uploads = image.array("image", 2);

router.get("/", authenticate, async (req, res) => {
    try{
        const studentModel =await initstudentModel();
        const teacher_id = req.user.id;
let response;
        let data = await studentModel.find({
            is_active: constants.STATE.ACTIVE,
            teacher_id: teacher_id,
        });
        if(data.length == 0){
            response = RESPONSE.NOT_FOUND;
        return res.json({
          code: response.code,
          message: "students" + response.message,
        });
        }else{
            data=data.map((item)=>{
                return{
                    _id:item._id,
                    student_name: item.student_name,
                    rollno: item.rollno,
                    image:item.image.map((img) =>"/uploads/"+ img),
                }
                });
            

        
            response=RESPONSE.SUCCESS;
        return res.json({
          code: response.code,
          message: response.message,
          data: data,
        });
    }

    }catch(err){
        console.log("listStudent:",err);
        return res.json(Response.UNKNOWN_ERROR);

    }
});

export default router;