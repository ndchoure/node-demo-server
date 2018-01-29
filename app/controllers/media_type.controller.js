var MediaType = require('../models/media_type.js');

exports.create = function(req, res) {
    // Create and Save a new Media Type
    if(!req.body.content) {
        res.status(400).send({message: "Media Type can not be empty"});
    }
    let media = new MediaType({name: req.body.name, description: req.body.description});

    media.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Media Type."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all media types from the database.
    MediaType.find(function(err, media_types){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving media types."});
        } else {
            res.send(media_types);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single media type with a id
    MediaType.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve media type with id " + req.params.id});
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a media type identified by the id in the request
    MediaType.findById(req.params.noteId, function(err, media_type) {
        if(err) {
            res.status(500).send({message: "Could not find a media type with id " + req.params.id});
        }

        media_type.name = req.body.name;
        media_type.description = req.body.description;

        media_type.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update media type with id " + req.params.id});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res){
    //Delete a media type with the specified id in the request
    MediaType.remove({_id: req.params.id}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete media type with id " + req.params.id}); 
        } else {
            res.send({message: "Media Type deleted successfully!"});
        }
    });
};
