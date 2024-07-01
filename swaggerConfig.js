import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Hunger Bites',
        version: '1.0.0',
        description: 'Documentation for the APIs in Hunger Bites',
        contact: {
            name: 'Shubham Sharma',
            email: 'sharma.shubham2124@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:7000',
            description: 'Development server'
        }
    ],
    apis: ['./routes/*.js']
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
