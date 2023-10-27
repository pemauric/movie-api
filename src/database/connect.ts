import mongoose from "mongoose";
import config from "config";

import Logger from "../../config/logger";

async function connect() {
    const uri = config.get<string>("uri");

    try {
        
        await mongoose.connect(uri);

        Logger.info("Connected to MongoDB!");

    } catch (e) {

        Logger.error("Error connecting:");
        Logger.error("Error: " + e);
        process.exit(1);
    }
}

export default connect;