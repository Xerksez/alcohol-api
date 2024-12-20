import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alcohol API',
      version: '1.0.0',
      description: 'API do zarządzania różnymi rodzajami alkoholi',
      contact: {
        name: 's24895',
        email: 's24895@pjwstk.edu.pl',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'REST API',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ścieżka do plików z komentarzami Swaggera
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
