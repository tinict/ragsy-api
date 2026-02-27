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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamaIndexController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../../Database/types");
const Services_1 = require("../../Services");
let LlamaIndexController = class LlamaIndexController {
    constructor(llamaIndexService) {
        this.llamaIndexService = llamaIndexService;
    }
    createIndexFromText() {
        return async (req, res, next) => {
            try {
                const { content } = req.body;
                const result = await this.llamaIndexService.createIndexFromText(content);
                return res.status(200).json({ message: result });
            }
            catch (err) {
                return next(err);
            }
        };
    }
    queryFile() {
        return async (req, res, next) => {
            try {
                const { question } = req.body;
                const answer = await this.llamaIndexService.queryFile(question);
                return res.status(200).json({ answer });
            }
            catch (err) {
                return next(err);
            }
        };
    }
};
exports.LlamaIndexController = LlamaIndexController;
exports.LlamaIndexController = LlamaIndexController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LlamaIndexService)),
    __metadata("design:paramtypes", [Services_1.LlamaIndexService])
], LlamaIndexController);
