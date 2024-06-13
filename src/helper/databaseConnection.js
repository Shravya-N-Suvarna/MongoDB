import mongoose from "mongoose"

const connectDB = async () =>{
    try{
        //compass
        const url = "mongodb://127.0.0.1:27017/backend_project_db"
        await mongoose.connect(url);

        //atlas
        // const url="mongodb+srv://Shravya:shravyasuvarna1998@@cluster0.aavgoa8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        // await mongoose.connect(url,{dbName:"backend_project_db"});



        console.log("connected to DB");
    }catch(err){
        console.log("Error while connecting DB");
    }

    };
    export default connectDB;