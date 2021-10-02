const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        invoiceID:{type:String, required:true},
        billingName:{type:String, required:true},
        billingAddress:{type:String, required:true},
        mobileNumber:{type:String,required:true},
        roomNumber:{type:String,required:true},
        noOfAdults:{type:String,required:true},
        noOfChildern:{type:String,required:true},
        totalDates:{type:String,required:true},
        totalAmount:{type:String,required:true}


    }
)

const Invoice = mongoose.model("Invoice",invoiceSchema);
module.exports = Invoice; 