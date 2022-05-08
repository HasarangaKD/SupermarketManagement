const mongoose = require('mongoose');
const complainSchema = new  mongoose.Schema({

    CustomerID:{
        type:String,
        require:true
    },

    ComplainType:{
        type:String,
        require:true
    },

    ItemCode:{
        type:String,
        require:true
    },

    ComplainDate:{
        type:Date,
        require:true
    },

    Description:{
        type:String,
        require:true
    },

});
module.exports = mongoose.model('Complains',complainSchema);