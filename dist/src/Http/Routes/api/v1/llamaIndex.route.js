"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamaIndexRoute = void 0;
const express_1 = require("express");
const AppServiceProvider_1 = __importDefault(require("../../../../Providers/AppServiceProvider"));
const llamaIndex_controller_1 = require("../../../Controllers/llamaIndex.controller");
class LlamaIndexRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.llamaIndexController = AppServiceProvider_1.default.getContainer().resolve(llamaIndex_controller_1.LlamaIndexController);
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Tạo index từ nội dung file
        this.router.post("/v1/index", this.llamaIndexController.createIndexFromText());
        // Query nội dung trong file
        this.router.post("/v1/query", this.llamaIndexController.queryFile());
    }
}
exports.LlamaIndexRoute = LlamaIndexRoute;
;
exports.default = new LlamaIndexRoute().router;
