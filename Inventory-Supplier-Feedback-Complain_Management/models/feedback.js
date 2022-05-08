const mongoose = require('mongoose');
const feedbackSchema = new  mongoose.Schema({

    CustomerID:{
        type:String,
        require:true
    },

    CustomerName:{
        type:String,
        require:true
    },

    Email:{
        type:String,
        require:true
    },

    feedbackDate:{
        type:Date,
        require:true
    },

    Description:{
        type:String,
        require:true
    },

});
module.exports = mongoose.model('Feedbacks',feedbackSchema);