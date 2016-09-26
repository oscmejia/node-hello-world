'use strict';

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


// Initialize db layer (Mongo)
initDb(config, (db) =>{
    if (db !== false) {
        // Internal Middleware
        app.use(middleware({ config, db }));

        // API Router
        app.use('/'+config.apiRootPath, api(config));

        // Port configuration
        app.server.listen(config.port);
        console.log('Started server on port ', config.port);
    }
    else{
        console.error("Fatal error. Can not connect to Mongo");
    }
});

export default app;
