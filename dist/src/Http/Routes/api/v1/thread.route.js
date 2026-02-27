"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadRoute = void 0;
const express_1 = require("express");
const AppServiceProvider_1 = __importDefault(require("../../../../Providers/AppServiceProvider"));
const Controllers_1 = require("../../../Controllers");
class ThreadRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.threadController = AppServiceProvider_1.default.getContainer().resolve(Controllers_1.ThreadController);
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/v1/threads", this.threadController.getThreads());
        this.router.post("/v1/thread", this.threadController.createThreads());
        this.router.delete("/v1/threads/:thread_id", this.threadController.deleteThreads());
    }
}
exports.ThreadRoute = ThreadRoute;
;
exports.default = new ThreadRoute().router;
