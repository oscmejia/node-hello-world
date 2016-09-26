'use strict';

import mongoose from 'mongoose';

export default (config, callback) => {

    mongoose.connect(config.mongoUrl);
    let db = mongoose.connection;

    db.on('error', (err) => {
        console.error('There was a db connection error');
        console.error(err.message);
        callback(false);
    });

    db.once('connected', () => {
        console.log('Successfully connected to ' + config.mongoUrl);
        return callback(db);
    });

    db.once('disconnected', () => {
        return console.error('Successfully disconnected from ' + config.mongoUrl);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.info('dBase connection closed due to app termination');
            return process.exit(0);
        });
    });
}
