"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
exports.default = {
    server: {
        id: config.server.id,
        port: config.server.port,
    },
    api: {
        route: config.api.route,
        modules: config.api.modules
    },
    serviceRegistry: config.serviceRegistry
};
