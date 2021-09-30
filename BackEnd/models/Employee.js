const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    firstName : {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    contactNumber: {
        type : Number,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    NIC: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    employeeType: {
        type : String,
        required : true
    },
    salary: {
        type : Number,
        required : true
    },
    availability: {
        type : String
    }
})

const employeeModel = mongoose.model("Employee",employeeSchema);

module.exports = employeeModel;