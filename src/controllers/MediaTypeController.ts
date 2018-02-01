import { Router, Request, Response, NextFunction } from "express";
import { default as MediaType, MediaTypeModel } from "../models/MediaType";

export default class MediaTypeExporter {
    public create(req: Request, res: Response) {
        // Create and Save a new Media Type
        if (!req.body.content) {
            res.status(400).send({message: "Media Type can not be empty"});
        } else {
            const media = new MediaType({name: req.body.name, description: req.body.description});
            media.save((err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while creating the Media Type."});
                } else {
                    res.send(data);
                }
            });
        }
    }

    public findAll(req: Request, res: Response) {
        // Retrieve and return all media types from the database.
        MediaType
        .find()
        .sort(req.query.sort)
        .limit(parseInt(req.query.limit) || 25)
        .skip(parseInt(req.query.offset) || 0)
        .maxScan(100)
        .exec((err, media_types) => {
            if (err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while retrieving media types."});
            } else {
                res.send(media_types);
            }
        });
    }

    public findOne(req: Request, res: Response) {
        // Find a single media type with a id
        MediaType.findById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({message: "Could not retrieve media type with id " + req.params.id});
            } else {
                res.send(data);
            }
        });
    }

    public update(req: Request, res: Response) {
        // Update a media type identified by the id in the request
        MediaType.findById(req.params.id, (err, media_type) => {
            if (err) {
                res.status(500).send({message: "Could not find a media type with id " + req.params.id});
            } else {
                if (req.body.name)
                    media_type.set("name", req.body.name);
                if (req.body.description)
                    media_type.set("description", req.body.description);

                media_type.save((err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: "Could not update media type with id " + req.params.id});
                    } else {
                        res.send(data);
                    }
                });
            }
        });
    }

    public delete(req: Request, res: Response) {
        // Delete a media type with the specified id in the request
        MediaType.remove({_id: req.params.id}, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({message: "Could not delete media type with id " + req.params.id});
            } else {
                res.send({message: "Media Type deleted successfully!"});
            }
        });
    }
}


