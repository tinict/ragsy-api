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
exports.ThreadService = void 0;
require("reflect-metadata");
const database_1 = require("firebase/database");
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
const firebase_config_1 = require("../Saas/firebase-config");
let ThreadService = class ThreadService {
    constructor() { }
    ;
    //Get threads
    async getThreads() {
        try {
            const threads = [];
            const database = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
            const dbRef = (0, database_1.ref)(database);
            const snapshot = await (0, database_1.get)(dbRef);
            const data = snapshot.val();
            const filteredData = Object.values(data).filter(item => item !== null);
            for (let key in filteredData) {
                const item = filteredData[key];
                if (item !== null && item !== undefined && item !== "" && !(typeof item === 'object' && item && Object.keys(item).length === 0)) {
                    threads.push(item);
                }
            }
            return threads;
        }
        catch (err) {
            throw err;
        }
    }
    ;
    //Generate thread ID
    async generateThreadID() {
        const fullUUID = (0, uuid_1.v4)();
        const shortenedUUID = fullUUID.split('-')[0];
        return shortenedUUID;
    }
    ;
    // Create threads
    async createThread(threadModel) {
        try {
            const database = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
            const threadRef = (0, database_1.ref)(database, 'threads/');
            const snapshot = await (0, database_1.get)(threadRef);
            let threadsArray = [];
            if (snapshot.exists())
                threadsArray = Object.values(snapshot.val());
            const newThread = {
                thread_id: await this.generateThreadID(),
                creator: {
                    user_id: threadModel.creator.user_id,
                    username: threadModel.creator.user_name
                },
                messages: [],
                content: threadModel.content,
                group_type: threadModel.group_type,
                timestamp: new Date().toISOString()
            };
            threadsArray.push(newThread);
            await (0, database_1.set)(threadRef, threadsArray);
        }
        catch (err) {
            throw err;
        }
    }
    ;
    //Delete threads
    async deleteThread(threadID) {
        try {
            const database = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
            const threadRef = (0, database_1.ref)(database, 'threads/');
            const snapshot = await (0, database_1.get)(threadRef);
            let threadsArray = [];
            if (snapshot.exists())
                threadsArray = Object.values(snapshot.val());
            const newThreadsArray = threadsArray.filter(thread => thread.thread_id !== threadID);
            await (0, database_1.set)(threadRef, newThreadsArray);
        }
        catch (err) {
            throw err;
        }
    }
    ;
};
exports.ThreadService = ThreadService;
exports.ThreadService = ThreadService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ThreadService);
;
