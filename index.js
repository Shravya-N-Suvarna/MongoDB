import express from "express"
const app = express();
const __dirname = path.resolve();

import dotenv from "dotenv"
dotenv.config();
import path from "path"
import connectDB from "./src/helper/databaseConnection.js";
import routes from "./Routes.js";
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));




routes(app);
connectDB();

app.listen(PORT, () =>{
    console.log("server listening on", PORT);
});
