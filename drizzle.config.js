import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    dialect: "sqlite",
    driver: "turso",
    schema: "./src/schema.js",
    dbCredentials: {
        url: process.env.DB_URL,
        authToken: process.env.DB_TOKEN,
    },
    out: "./drizzle",
});
