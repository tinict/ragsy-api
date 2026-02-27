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
exports.ThreadController = void 0;
require("reflect-metadata");
const Models_1 = require("../../Models");
const inversify_1 = require("inversify");
const types_1 = require("../../Database/types");
const Services_1 = require("../../Services");
let ThreadController = class ThreadController {
    constructor(threadService) {
        this.threadService = threadService;
    }
    ;
    getThreads() {
        return async (req, res, next) => {
            try {
                const threads = await this.threadService.getThreads();
                res.status(200).json(threads);
            }
            catch (err) {
                next(err);
            }
        };
    }
    ;
    createThreads() {
        return async (req, res, next) => {
            try {
                console.log(req.body);
                const threadCreateModel = Models_1.ThreadCreateModel.toThreadCreateModel(req.body);
                console.log(threadCreateModel);
                await this.threadService.createThread(threadCreateModel);
                res.status(200).json({ message: 'Thread created successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
    ;
    deleteThreads() {
        return async (req, res, next) => {
            try {
                const threadID = req.params.thread_id;
                await this.threadService.deleteThread(threadID);
                res.status(200).json({ message: 'Thread deleted successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
    ;
};
exports.ThreadController = ThreadController;
exports.ThreadController = ThreadController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ThreadService)),
    __metadata("design:paramtypes", [Services_1.ThreadService])
], ThreadController);
;
