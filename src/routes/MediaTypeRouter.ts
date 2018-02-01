import { Router } from "express";
import MediaTypeController from "../controllers/MediaTypeController";

export class MediaTypeRouter {
    router: Router;
    media: MediaTypeController;
    constructor() {
      this.router = Router();
      this.media = new MediaTypeController();
      this.init();
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.route("/")
            .post(this.media.create)  // Create a new Media Type
            .get(this.media.findAll); // Retrieve all Media Types

        this.router.route("/:id")
            .get(this.media.findOne)  // Retrieve a single Media Type with id
            .put(this.media.update) // Update a Media Type with id
            .delete(this.media.delete); // Delete a Media Type with id
    }
}

const mediaTypeRouter = new MediaTypeRouter();
export default mediaTypeRouter.router;
