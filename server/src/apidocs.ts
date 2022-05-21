import swaggerJsdoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tracking Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Liu, Wen",
        url: "https://liuwen.io",
        email: "wenliu2@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
  },
  apis: [
    "./server/**/*.ts",
    "./dist-server/server/**/*.js",
  ],
  encoding: "utf-8",
  failOnErrors: true,
  verbose: true,
  format: ".json",
};

const specs = swaggerJsdoc(options);
export const apidocs = {
  path: "/api-docs",
  swaggerUI,
  specs,
}