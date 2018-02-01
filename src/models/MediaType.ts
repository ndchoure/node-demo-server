import * as mongoose from "mongoose";

export type MediaTypeModel = mongoose.Document & {
    name: String,
    description: String
};

const MediaTypeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const MediaType = mongoose.model("MediaType", MediaTypeSchema);

export default MediaType;
