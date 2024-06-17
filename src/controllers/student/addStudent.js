import express from "express";
const router = express.Router();
import constants from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middleware/authenticate.js";
import multer from "multer";
import image from "../../middleware/uploads.js";
import initstudentModel from "../../model/studentModel.js";
const uploads = image.array("image", 2);

router.post("/", authenticate, async (req, res) => {
  try {
    let response;
    uploads(req, res, async (err) => {
      if (!req.files || req.files == "") {
        response = RESPONSE.MANDATORY_PARAMS;
        return res.json({
          code: response.code,
          message: "image" + response.message,
        });
      } else if (err instanceof multer.MulterError) {
        console.log("MulterErr-", err);
        return res.json(RESPONSE.MULTER_ERR);
      }

      if (err) {
        return res.json(RESPONSE.UNKNOWN_ERROR);
      }

      let fileName = [];

      if (req.files != null) {
        req.files.forEach((ele) => {
          fileName.push(ele.filename);
        });
      }

      const studentModel = await initstudentModel()
      const{ student_name, rollno }= req.body;
      const teacher_id = req.user.id;

      if (!student_name || student_name == "") {
        response = RESPONSE.MANDATORY_PARAMS;
        return res.json({
          code: response.code,
          message: "student_name" + response.message,
        });
    }

        if (!rollno || rollno == "") {
            response = RESPONSE.MANDATORY_PARAMS;
            return res.json({
              code: response.code,
              message: "rollno" + response.message,
            });


         }
         console.log(req.user);
         await studentModel.create({
            student_name: student_name,
            rollno: rollno,
            image: fileName,
            teacher_id:teacher_id,
         });




      return res.json(RESPONSE.SUCCESS);
    });
  } catch (err) {
    console.log(err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
