"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
let PingController = class PingController {
    constructor() { }
    ;
    PingWakeupServer() {
        return async (req, res, next) => {
            try {
                return res.status(200).json({ version: "0.1.0" });
            }
            catch (err) {
                return next(err);
            }
        };
    }
};
exports.PingController = PingController;
exports.PingController = PingController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], PingController);
