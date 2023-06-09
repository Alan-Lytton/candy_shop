const mongoose = require('mongoose')

const CandySchema = new mongoose.Schema({

    candyName:{
        type:String,
        required: [true,"Product name is required!"],
        minlength: [3,"Product name must be at least 3 characters long!"],
        maxLength: [50,"Product name can not be more than 50 characters!"]
    },
    candyPrice:{
        type:Number,
        required: [true,"Product price is required!"],
        min:[0.01,"Product price must be greater than 0!"],
        get: v =>Math.floor(v * 100) /100,
        set: v =>Math.floor(parseFloat(v)*100)/100
    },
    candyDescription:{
        type:String,
        required:[true,"Product description is required!"],
        maxLength: [300,"Product description can not exceed 300 characters!"]
    },
    candyImage:{
        type:String,
        required:[true,"Product image link is required!"]
    },
    candyCategory:{
        type:String,
        required:[true,"Product Category is required!"]
    },
    candyStock:{
        type:Number,
        required:[true,"Product quantity is required!"],
        min:[1,"Product quantity must be at least 1!"],
        validate:{
            validator:Number.isInteger,
            message:"Product quantity must be a whole number!"
        }
    },
    onSale:{
        type:Boolean,
        default:false,
    },
    candyDiscount:{
        type:Number,
        default:0,
        min:[0.0, "Product discount must be at least 0!"],
        max:[0.99, "Product discount must be 0.99 or less!"]
    }
},{timestamps:true});

module.exports=mongoose.model('Candy',CandySchema)