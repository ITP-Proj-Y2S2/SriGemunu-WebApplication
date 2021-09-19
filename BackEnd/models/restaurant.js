const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restSchema = new Schema({

    item : {
        type: String,
        required: true
    },
    itemno : { 
        type: Number,
        required: true
    },
    price : { 
        type: Number,
        required: true
    }

})

const Restaurant = mongoose.model("Restaurant",restSchema);

module.exports = Restaurant;


