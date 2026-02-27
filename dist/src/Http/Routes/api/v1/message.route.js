"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoute = void 0;
const express_1 = require("express");
const AppServiceProvider_1 = __importDefault(require("../../../../Providers/AppServiceProvider"));
const Controllers_1 = require("../../../Controllers");
class MessageRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.messageController = AppServiceProvider_1.default.getContainer().resolve(Controllers_1.MessageController);
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/v1/messages/:thread_id", this.messageController.getMessagesInThread());
        this.router.post("/v1/messages/:thread_id", this.messageController.createMeasageInThread());
    }
}
exports.MessageRoute = MessageRoute;
exports.default = new MessageRoute().router;
