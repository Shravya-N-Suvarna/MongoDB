import express from "express"
const router = express.Router();

import addStudent from "./addStudent.js";
import listStudent from "./listStudent.js";
import listStudentById from "./listStudentById.js";
import list from "./list.js";


router.use("/add_student",addStudent);
router.use("/list_student",listStudent);
router.use("/list_student_by_id",listStudentById);


// example for both the liststudent and listStudentById merging
router.use("/list_1",list);

export default router;