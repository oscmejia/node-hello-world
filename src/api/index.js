import { version } from '../../package.json';
import { Router } from 'express';
import { register } from './register';


export default ({ config, db }) => {
    let conf = { config, db };
    let api = Router();

    api.get('/', (req, res) => {
        res.json({ version });
    });

    api.post('/register', (req, res) => register(conf, req, res));

    return api;
}
