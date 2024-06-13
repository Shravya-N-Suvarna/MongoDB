import express from "express"
const app = express();

import dotenv from "dotenv"
dotenv.config();

import connectDB from "./src/helper/databaseConnection.js";
import routes from "./Routes.js";
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);


connectDB();

app.listen(PORT, () =>{
    console.log("server listening on", PORT);
});
