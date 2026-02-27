import express from "express";
// import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import route from "./Http/Routes";
import config from '../config';
import listenSocket from './Socket';
import { Server } from 'socket.io';

const port = config.server.port;

const app = express();

app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false
}))

app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}));

app.use(cors());
app.use(compression());

app.use(morgan('dev'));

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    listenSocket(io, socket);
});

route(app);

httpServer.listen(
    port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
);