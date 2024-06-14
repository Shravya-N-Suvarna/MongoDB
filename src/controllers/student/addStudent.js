import express from "express"
const router = express.Router()
import constants from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middleware/authenticate.js";

router.post("/", authenticate,async(req,res)=>{
    try{
        return res.json(RESPONSE.SUCCESS);

    }catch(err){
        console.log(err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
});

export default router;

