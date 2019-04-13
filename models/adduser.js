const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',peopleSchema);