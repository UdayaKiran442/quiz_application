/**
 * @author Udaya Kiran Gonuguntla
 * @returns Object of active secret variables
 * @description Configuration file to fetch active secret values based on environment
 */
import * as dotenv from "dotenv";

// fetch current environment from package.json
const environment = process.env.NODE_ENV;

if (environment === "development") {
    dotenv.config({ path: "../../.env.development" });
}
else {
    dotenv.config({ path: "../../.env.production" });
}

export const ActiveConfig = {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
}