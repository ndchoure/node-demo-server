// Module dependecies
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as errorHandler from "errorHandler";
const config = require("config.json")("./config.json");

// Imports routers
import mediaTypeRouter from "./routes/MediaTypeRouter";

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
      this.express = express();
      this.middleware();
      this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.set("host", config.server.host || "0.0.0.0");
        this.express.set("port", process.env.PORT || config.server.port || 8080); // Set a port
        this.connectDatabase();
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        const router = express.Router();
        // define a simple route
        router.get("/", function(req, res) {
            res.json({"message": "Welcome to Adoptions API."});
        });

        // Define middleware to use for all requests
        router.use((req, res, next) => {
            // Do logging
            // console.log('Something is happening');
            next(); // Make sure we go to the next route after this
        });

        this.express.use("/api", router);
        // Require routes
        this.express.use("/api/media_types", mediaTypeRouter);
    }

    // Connect to Database
    private connectDatabase(): void {
        require("mongoose").Promise = global.Promise;
        mongoose.connect(config.db.mlab_url, {
            // useMongoClient: true
        });

        mongoose.connection.on("error", (err) => {
            console.error(err);
            console.log("Could not connect to the database. Exiting now...");
            process.exit();
        });

        mongoose.connection.once("open", () => {
            console.log("Successfully connected to the database");
        });
    }
}

export default new App().express;