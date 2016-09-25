import { version } from '../../package.json';
import { Router } from 'express';
import register from './register';


export default ({ config, db }) => {
	let api = Router();

    api.use('/register2', register({ config, db }));

	api.get('/', (req, res) => {
		res.json({ version });
	});

    api.post('/register', (req, res) => {
        let data = req.body;

        console.log(req.body);
        console.log(data.first_name);
        
		res.json(data);
	});

	return api;
}
