
// Modules
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Classes
import initDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// Sttatic assets
app.use(express.static(__dirname + '/public'));

// CORS middleware 
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

// Basic configuration
app.use(bodyParser.json({
    limit: config.bodyLimit
}));


// Initialize db layer
initDb(db => {

    // Internal Middleware
    app.use(middleware({ config, db }));

    // API Router
    app.use('/api', api({ config, db }));

    app.server.listen(config.port);

    console.log('Started server on port ${app.server.address().port}');
});

export default app;
