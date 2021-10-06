const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const occasionSchema = new Schema({

    type: {
        type: String,
        required : true
        

    },

    guests: {
        type: Number,
        required: true
    },

    time: {
        type: String,
        required: true

    },

    email: {
            type: String,
            required: true
        },

        bookedDate: {
            type: String,
            required: true
        },

        menu: {
            type: String,
            required: true
        },
        userId :{
            type: String,
            required : true,
        }

    })

const occasion = mongoose.model("occasion", occasionSchema);

module.exports = occasion;