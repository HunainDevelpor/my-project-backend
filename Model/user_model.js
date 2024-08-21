const mongoose = require('mongoose');
const userSchema=mongoose.Schema({

        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        IdentificationNumber:{
            type:Number,
            required:true
        },
        PolicyNumber:{
            type:Number,
            required:true
        },

})
const userModel=mongoose.model('user',userSchema)
module.exports={userModel}