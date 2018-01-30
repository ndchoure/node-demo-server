const MediaType = require('../models/media_type.js');

exports.create = (req, res) => {
    // Create and Save a new Media Type
    if(!req.body.content) {
        res.status(400).send({message: "Media Type can not be empty"});
    }
    let media = new MediaType({name: req.body.name, description: req.body.description});

    media.save((err, data) => {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Media Type."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    // Retrieve and return all media types from the database.
    let sort = req.params.sort || '_id';
    let order = req.params.order || -1
    MediaType
    .find()
    .sort({ sort : order})
    .limit(req.params.limit || 25)
    .skip(req.params.offset || 0)
    .maxScan(100)
    .exec((err, media_types) => {
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving media types."});
        } else {
            res.send(media_types);
        }
    });
};

exports.findOne = (req, res) => {
    // Find a single media type with a id
    MediaType.findById(req.params.id, (err, data) => {
        if(err) {
            res.status(500).send({message: "Could not retrieve media type with id " + req.params.id});
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    // Update a media type identified by the id in the request
    MediaType.findById(req.params.noteId, (err, media_type) => {
        if(err) {
            res.status(500).send({message: "Could not find a media type with id " + req.params.id});
        }

        media_type.name = req.body.name;
        media_type.description = req.body.description;

        media_type.save((err, data) => {
            if(err) {
                res.status(500).send({message: "Could not update media type with id " + req.params.id});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = (req, res) => {
    //Delete a media type with the specified id in the request
    MediaType.remove({_id: req.params.id}, (err, data) => {
        if(err) {
            res.status(500).send({message: "Could not delete media type with id " + req.params.id}); 
        } else {
            res.send({message: "Media Type deleted successfully!"});
        }
    });
};
