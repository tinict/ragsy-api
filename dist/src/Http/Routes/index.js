"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route;
const thread_route_1 = __importDefault(require("./api/v1/thread.route"));
const message_route_1 = __importDefault(require("./api/v1/message.route"));
const llamaIndex_route_1 = __importDefault(require("./api/v1/llamaIndex.route"));
function route(app) {
    const root = '/api';
    app.use(root, thread_route_1.default);
    app.use(root, message_route_1.default);
    app.use(root, llamaIndex_route_1.default);
}
;
