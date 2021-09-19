const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    room:{
        type: String,
        required : true,
    },
    roomId :{
        type: String,
        required : true,
    },
    userId :{
        type: String,
        required : true,
    },
    basis:{
        type: String,
        required : true,
    },
    fromDate:{
        type: String,
        required : true,
    },
    toDate :{
        type: String,
        required : true,
    },
    totalDays:{
        type: String,
        required : true,
    },
    totalAmount:{
        type: Number,
        required : true,
    },
    status: {
        type: String,
        required : true,
        default : 'booked '
    }

},{
    timestamps:true
})

const bookingModel = mongoose.model('bookings',bookingSchema);
module.exports = bookingModel;