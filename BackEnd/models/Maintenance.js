const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    highPriority:{
        type: Boolean,
        required: false
    }
    
})

const maintenanceModel = mongoose.model("maintenance",maintenanceSchema); //maintenance in brackets is table name

module.exports = maintenanceModel;