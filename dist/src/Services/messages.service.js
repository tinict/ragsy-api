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
exports.MessageService = void 0;
require("reflect-metadata");
const database_1 = require("firebase/database");
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
const firebase_config_1 = require("../Saas/firebase-config");
let MessageService = class MessageService {
    constructor() { }
    ;
    //Generate thread ID
    async generateThreadID() {
        const fullUUID = (0, uuid_1.v4)();
        const shortenedUUID = fullUUID.split('-')[0];
        return shortenedUUID;
    }
    ;
    //Get messages
    async getMessages(thread_id) {
        try {
            const messages = [];
            const database = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
            const dbRef = (0, database_1.ref)(database, `/threads/${thread_id}/messages`);
            (0, database_1.onValue)(dbRef, (snapshot) => {
                const data = snapshot.val();
                for (let key in data) {
                    messages.push(data[key]);
                }
            });
            return messages;
        }
        catch (err) {
            throw err;
        }
    }
    ;
    //Create message answer for thread_id
    async createMessage(createMessageModel) {
        try {
            const db = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
            const messagesRef = (0, database_1.ref)(db, `threads/${createMessageModel.thread_id}/messages`);
            const snapshot = await (0, database_1.get)(messagesRef);
            let messagesArray = [];
            if (snapshot.exists())
                messagesArray = Object.values(snapshot.val());
            const newMessage = {
                sender: {
                    user_id: createMessageModel.sender.user_id,
                    username: createMessageModel.sender.username
                },
                content: createMessageModel.content,
                timestamp: new Date().toISOString()
            };
            console.log(newMessage);
            messagesArray.push(newMessage);
            await (0, database_1.set)(messagesRef, messagesArray);
        }
        catch (err) {
            throw err;
        }
    }
    ;
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MessageService);
;
