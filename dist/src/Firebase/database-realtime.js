"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const firebase_config_1 = require("../Saas/firebase-config");
const database_1 = require("firebase/database");
const database = (0, database_1.getDatabase)(firebase_config_1.initFirebase);
exports.database = database;
