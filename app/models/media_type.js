const mongoose = require('mongoose');

const MediaTypeSchema = new mongoose.Schema(
    {
        name: {type:String, unique:true},
        description: String,
        image: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('MediaType', MediaTypeSchema);
