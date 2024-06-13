import mongoose from "mongoose";

const studentModel={
    student_name:{
        type:String,
        required: true,
    },
    rollno:{
        type:String,
        required: true,
    },
    image:{
        type:[String],
        data:buffer,
        required: true,
    },
    teacher_id:{
        type: Schema.Types.ObjectId,
        ref:"teacherdata",
    },
    is_active:{
        type:String,
        default: 1,
    },
};

let student = null;

const initStudentModel = async()=>{
    try{
        

        student = mongoose.model("studentmodel",studentModel);
        return student;
    }catch(err){
        console.log("student-model",err);
    }
};
export default initStudentModel;