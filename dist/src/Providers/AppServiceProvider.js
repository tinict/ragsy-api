"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../Database/types");
const Services_1 = require("../Services");
class AppServiceProvider {
    constructor() {
        this.container = new inversify_1.Container();
        this.register();
    }
    register() {
        this.container.bind(types_1.TYPES.MessageService).to(Services_1.MessageService);
        this.container.bind(types_1.TYPES.ThreadService).to(Services_1.ThreadService);
        this.container.bind(types_1.TYPES.LlamaIndexService).to(Services_1.LlamaIndexService);
    }
    getContainer() {
        return this.container;
    }
}
exports.default = new AppServiceProvider;
