/*
sales: 
product
catogory
customer
total
date
*/

import { model, Schema } from 'mongoose';

const salesSchema = new Schema({
    product: {
        type: String,

    },
    category: {

        type: String,

    },
    customer: {

        type: String,
      
    },
    total: {
        type: Number,
      
        min: 0.01
    },
    date: {
        type: Date,
      
    }
}, {
    timestamps: true,
    strict: false
});

export default model('sales', salesSchema);
