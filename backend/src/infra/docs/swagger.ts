import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'UnBordo',
      version: '1.0.0',
      description: 'API para o projeto UnBordo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/api/routes/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

export default setupSwagger;
