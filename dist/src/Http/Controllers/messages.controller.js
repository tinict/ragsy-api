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
exports.MessageController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../../Database/types");
const Services_1 = require("../../Services");
const Models_1 = require("../../Models");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    ;
    getMessagesInThread() {
        return async (req, res, next) => {
            try {
                const message_id = req.params.thread_id;
                console.log(message_id);
                const messages = await this.messageService.getMessages(message_id);
                return res.status(200).json(messages);
            }
            catch (err) {
                return next(err);
            }
        };
    }
    ;
    createMeasageInThread() {
        return async (req, res, next) => {
            try {
                const { content, sender } = req.body;
                const thread_id = req.params.thread_id;
                // const senderCreateModel = SenderCreateModel.toSenderCreateModel({ user_id, username });
                const messageCreateModel = Models_1.MessageCreateModel.toMessageCreateModel({ content, sender, thread_id });
                await this.messageService.createMessage(messageCreateModel);
                res.status(200).json({ message: 'Message created successfully' });
            }
            catch (err) {
                return next(err);
            }
        };
    }
    ;
};
exports.MessageController = MessageController;
exports.MessageController = MessageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.MessageService)),
    __metadata("design:paramtypes", [Services_1.MessageService])
], MessageController);
;
