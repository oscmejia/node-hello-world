'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
    id: ObjectId,
    first_name: {
        type: String,
        minlength: [3, "First Name should be at least 3 characters"],
        required: [true, "First Name is required"]
    },
    last_name: {
        type: String,
        minlength: [3, "Last Name should be at least 3 characters"],
        required: [true, "Last Name is required"]
    },
    address_1: {
        type: String,
        minlength: [5, "Address 1 should be at least 5 characters"],
        required: [true, "Address 1 is required"]
    },
    address_2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        minlength: [3, "City should be at least 3 characters"],
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    zipcode: {
        type: Number,
        required: [true, "Zipcode is required"],
        min: [10000, 'Invalid zipcode'],
        max: 99999
    },
    zipcode_plus4: {
        type: Number,
        required: [true, "Zipcode Plus4 is required"],
        min: [1000, 'Invalid zipcode plus4'],
        max: 9999
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

let User = mongoose.model('users', UserSchema);

export { User };
