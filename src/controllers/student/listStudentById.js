import express from "express";
const router = express.Router();
import constants from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middleware/authenticate.js";
import multer from "multer";
import image from "../../middleware/uploads.js";
import initstudentModel from "../../model/studentModel.js";
const uploads = image.array("image", 2);

router.get("/:id", authenticate, async (req, res) => {
    try{
        const studentModel =await initstudentModel();
        const teacher_id = req.user.id;
        let response;
        const student_id=req.params.id

        let data = await studentModel.findOne({
            is_active: constants.STATE.ACTIVE,
            teacher_id: teacher_id,
            _id: student_id,
        });
        if(data){

            data={
            _id: data._id,
            student_name:data.student_name,
            rollno: data.rollno,
            image: data.image.map((img) => "/uploads/" +img),
        
        };




            response=RESPONSE.SUCCESS;
        return res.json({
          code: response.code,
          message: response.message,
          data: data,

        });
    }else{
        response = RESPONSE.NOT_FOUND;
        return res.json({
          code: response.code,
          message: "students" + response.message,
        });

    }




    
    }catch{
        console.log("listStudent:",err);
        return res.json(Response.UNKNOWN_ERROR);
    }});

    export default router;