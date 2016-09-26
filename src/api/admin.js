'use strict';

import { User } from '../models/user';

let listUsers = ({ body }, res) => {
    // TODO: paginate response.
    User.find({}, function (err, users) {
        if (err) {
            console.error(err);
            return res.status(500).send("internal error");
        }
        
        let response = {
            data: users
        }
        res.status(200).json(response);
    });
};

export { listUsers }