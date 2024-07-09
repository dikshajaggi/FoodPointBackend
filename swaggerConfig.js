import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Food Point',
        version: '1.0.0',
        description: 'Documentation for the APIs in Food Point',
        contact: {
            name: 'Diksha Jaggi',
            email: 'diksha2000may@gmail.com'
        }
    },
    servers: [
        {
            url: 'https://foodpointbackend-7mxm.onrender.com',
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
