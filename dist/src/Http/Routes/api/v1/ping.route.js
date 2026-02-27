"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingRoute = void 0;
const express_1 = require("express");
const AppServiceProvider_1 = __importDefault(require("../../../../Providers/AppServiceProvider"));
const Controllers_1 = require("../../../Controllers");
class PingRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.pingController = AppServiceProvider_1.default.getContainer().resolve(Controllers_1.PingController);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/v1/wake-up/ping", this.pingController.PingWakeupServer());
    }
}
exports.PingRoute = PingRoute;
;
exports.default = new PingRoute().router;
