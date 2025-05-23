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
    apis: ["./routes/*.js"], // Caminho para as rotas
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}