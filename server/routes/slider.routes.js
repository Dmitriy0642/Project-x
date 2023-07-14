const express = require("express");
const Slider = require("../models/Slider")
const router = express.Router({ mergeParams: true });


///created http post on send pictures, and examination on reusable, resend this picture
router.post("/",async (req,res)=>{
    try {
        const data = req.body
        const updateDb = await Slider.create(data)
        res.status(200).send(updateDb)
    } catch (e) {
        res.status(500).json({
            message: "Server are has problem"
        })
    }
})

///get request 
router.get("/",async (req,res)=>{
    try {
        const list = await Slider.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message:"On server happend error"
        })
    }
})

module.exports = router