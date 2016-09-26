'use strict';

import { Router } from 'express';
import { info } from './info';
import { register } from './register';
import { listUsers } from './admin';
import { unsupportedPost, unsupportedGet } from './unsupported';

export default (config) => {
    let api = Router();

    api.get('/', (req, res) => { info(config, req, res) });
    api.post('/register', register);
    api.get('/user', listUsers);
    api.get('*', unsupportedGet);
    api.post('*', unsupportedPost);

    return api;
}
