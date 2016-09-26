'use strict';

import { version } from '../../package.json';

let info = (config, req, res) => {
    res.json({ version, server: config.serverName });
};

export { info }
