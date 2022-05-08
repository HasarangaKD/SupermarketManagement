const express = require('express');
const res = require('express/lib/response');

const Complains = require('../models/complain');

const router = express.Router();

//SAVE COMPLAIN
router.post('/post/save',(req,res)=>{

    let newComplain = new Complains(req.body);
    
    newComplain.save((err) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:"complain savedsuccessfully"
        });
    });
});
// get 
router.get('/complain',(req,res) =>{
    Complains.find().exec((err,complains) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:true,
        existingComplains:complains
    });
    });
}); 
// get a specific post
router.get("/complain/:id",(req,res) =>{
    let complainId = req.params.id;

    Complains.findById(complainId,(err,complains) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            complains
        });
    });
});
//update posts

router.put('/post/update/:id',(req,res)=>{
    Complains.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
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
router.delete('/post/delete/:id',(req,res) =>{
    Complains.findByIdAndRemove(req.params.id).exec((err,deletedPost) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete suceesfull",deletedPost
        });
        
    });
});


module.exports = router;