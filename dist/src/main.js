"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const Routes_1 = __importDefault(require("./Http/Routes"));
const config_1 = __importDefault(require("../config"));
const Socket_1 = __importDefault(require("./Socket"));
const socket_io_1 = require("socket.io");
const dotenv = __importStar(require("dotenv"));
const port = config_1.default.server.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv.config({ path: './.env' });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "secret",
    saveUninitialized: false,
    resave: false
}));
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('dev'));
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) => {
    (0, Socket_1.default)(io, socket);
});
(0, Routes_1.default)(app);
httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
