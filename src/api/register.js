'use strict';

import { User } from '../models/user';
import _ from 'lodash';

let register = ({ body }, res) => {
    if(_.isEmpty(body))
        return res.status(400).send("Invalid request");
    
    // Try to create a user
    let user = new User();
    // TODO: this is a prototype, lets validate/assign parameters one by one.
    user.first_name = body.first_name ? body.first_name : "";
    user.last_name = body.last_name ? body.last_name : "";
    user.address_1 = body.address_1 ? body.address_1 : "";
    user.address_2 = body.address_2 ? body.address_2 : "";
    user.city = body.city ? body.city : "";
    user.state = body.state ? body.state : "";
    user.country = body.country ? body.country : "";
    user.zipcode = body.zipcode ? body.zipcode : 0;
    user.zipcode_plus4 = body.zipcode_plus4 ? body.zipcode_plus4 : 0;

    // All validations are performed at the Model level
    user.save(err => {
        if (err)
            res.status(404).json({error: err.message});
        else
            res.status(201).json({ id: user._id });
    });
};

export { register }
