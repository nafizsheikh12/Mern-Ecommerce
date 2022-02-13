const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const orderSchema = new mongoose.Schema({
  shippingInfo: {  
    address: {
        type:String,
        required:[true,"enter  address"],
       
    },
    city:{
        type:String,
        required:[true,"enter city"],
    },
    state:{
        type:String,
        required:[true,"enter state"],
     
    },
  
    country:{
        type:String,
        required:true
       
    },

    pincode:{
        type:String,
        required:true
       
    },

    phoneno:{
        type:String,
        required:true
       
    },

          },


  orderItems: [
      {
        name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "ecommerceproduct",
            required: true,
          },
      }
  ],
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "ecommerceUser",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
   

})



module.exports = mongoose.model('orderemcommerce',orderSchema)

