// Module dependecies
import * as errorHandler from "errorHandler";
import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());


// listen for requests
app.listen(app.get("port"), () => {
    console.log(`Server is listening on port ${app.get("port")} in ${app.get("env")} mode`);
    console.log("Press CTRL-C to stop server\n");
});
