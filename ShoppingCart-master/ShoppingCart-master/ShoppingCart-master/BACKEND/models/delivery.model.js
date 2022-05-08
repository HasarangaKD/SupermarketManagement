const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    customerName:{
        type:String,
        required:true
    },
    NICNumber:{
        type:String,
        required:true,
        minlength: 10,
        unique:true
    },
    itemCode:{
        type:String,
        required:true,
        minlength: 4
    },
    address:{
        type:String,
        required:true
    },
    deliveryMethod:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true,
        minlength: 10
    },
    date: {
        type:Date
    }
})

const Delivery = mongoose.model("Delivery" , DeliverySchema);

module.exports = Delivery;