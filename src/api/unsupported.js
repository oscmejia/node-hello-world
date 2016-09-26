'use strict';

let unsupportedPost = (req, res) => {
    console.info("unsupported route (POST)", req.url);
    res.status(404).send();
};

let unsupportedGet = (req, res) => {
    console.info("unsupported route (GET)", req.url);
    res.status(404).send();
};

export { unsupportedPost, unsupportedGet }
