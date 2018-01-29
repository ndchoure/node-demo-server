var mongoose = require('mongoose');

var MediaTypeSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        image: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('MediaType', MediaTypeSchema);
