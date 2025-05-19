// backend/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Viver Solidário API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"], // Documente suas rotas com JSDoc!
};

export const swaggerSpec = swaggerJSDoc(options);

// No seu server.js:
import express from "express";
import { swaggerSpec } from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));