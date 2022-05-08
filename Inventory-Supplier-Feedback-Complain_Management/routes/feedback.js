const express = require('express');
const res = require('express/lib/response');

const Feedbacks = require('../models/feedback');

const router = express.Router();

//SAVE feedback
router.post('/feedback/save',(req,res)=>{

    let newFeedback = new Feedbacks(req.body);
    
    newFeedback.save((err) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:"feedback savedsuccessfully"
        });
    });
});
// get 
router.get('/feedback',(req,res) =>{
    Feedbacks.find().exec((err,feedbacks) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:true,
        existingFeedbacks:feedbacks
    });
    });
}); 
// get a specific post
router.get("/feedback/:id",(req,res) =>{
    let feedbackId = req.params.id;

    Feedbacks.findById(feedbackId,(err,feedbacks) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            feedbacks
        });
    });
});
//update posts

router.put('/feedback/update/:id',(req,res)=>{
    Feedbacks.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,feedback)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"updated succesfully"
            

            });
        }
        
    );
});
// delete post
router.delete('/feedback/delete/:id',(req,res) =>{
    Feedbacks.findByIdAndRemove(req.params.id).exec((err,deletedFeedback) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete suceesfull",deletedFeedback
        });
        
    });
});


module.exports = router;