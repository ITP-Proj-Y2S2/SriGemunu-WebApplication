const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required : true
    },

    type: {
        type: String,
        required : true
    },

    size : {
        type: Number,
        required: true
    },

    number : {
        type: Number,
        required: true
    }, 

    imageurls : [],

    currentbookings : [],

    description : {
        type : String
    }
})

const roomModel = mongoose.model('rooms',roomSchema);
module.exports = roomModel