
// Modules
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let app = express();
app.server = http.createServer(app);

// CORS middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use('/static', express.static('public'));

export default app;
