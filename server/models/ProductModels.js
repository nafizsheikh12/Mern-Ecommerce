const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"enter product name"],
       
    },
    desc:{
        type:String,
        required:[true,"enter description name"],
    },
    price:{
        type:Number,
        required:[true,"enter product price"],
       maxLength:[8,"price 8 character"]
    },
    rating:{
        type:Number,
        defalut: 0,
    },
    images:[

      {  
        public_id:{
            required:true,
            type:String,
        },
        url: {
            type:String,
            required:true
        }
      }  
    ],
    category:{
        type:String,
        required:[true,"enter product category"],
    },
    stock:{
        type: Number,
        required:[true,"enter product stock"],
        
    },
    numofreviews: {
        type:Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },   
            comment:{
                type:String,
                required:true,
            },

        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"ecommerceUser",
        required:true
    },

    createdAt:{
        type:Date,
        defalut:Date.now
    }
  
},
{timestamps:true}
)

module.exports = mongoose.model('ecommerceproduct',ProductSchema)