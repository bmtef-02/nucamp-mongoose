const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// instantiate new object named campsiteSchema
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    // will add properties createAt and updatedAt with the time it was created
    timestamps: true
});

// a model using the schema which is used to instantiate documents for mongodb
// 1st argument must be the captialized and singular version of the collection - mongoose will look for campsites collection
// 2nd argument is schema used for the collection
const Campsite = mongoose.model('Campsite', campsiteSchema)

module.exports = Campsite;