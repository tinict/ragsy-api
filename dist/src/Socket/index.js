"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
exports.default = (io, socket) => {
    const threadService = new Services_1.ThreadService();
    const messageService = new Services_1.MessageService();
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', (reason) => {
        console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);
    });
    socket.on('join-room', async (room) => {
        try {
            if (!room) {
                console.warn("No room provided");
                return;
            }
            const threads = await threadService.getThreads();
            if (!threads || threads.length === 0) {
                console.warn("No threads found");
                return;
            }
            const rooms = Object.keys(threads[0] || {});
            if (!rooms.includes(room)) {
                console.log("Room not exists: " + room);
                return;
            }
            console.log("Room joined successfully: " + room);
            socket.join(room);
            const listMessage = await messageService.getMessages(room);
            socket.emit('history-message', listMessage);
            io.to(room).emit('history-message', listMessage);
        }
        catch (err) {
            console.error("Error in 'join-room':", err);
        }
    });
    socket.on('send-message', async (data) => {
        try {
            const { sender, content, id, thread_id } = data || {};
            if (!thread_id || !sender || !content) {
                console.warn("Invalid message data:", data);
                return;
            }
            console.log("Sending message:", data);
            await messageService.createMessage(data);
            const listMessage = await messageService.getMessages(thread_id);
            socket.emit('list-message', listMessage);
            io.to(thread_id).emit('list-message', listMessage);
        }
        catch (err) {
            console.error("Error in 'send-message':", err);
        }
    });
    async function emitReceivedMessage() {
        try {
            const threads = await threadService.getThreads();
            socket.emit('received-message', threads);
        }
        catch (err) {
            console.error("Error in 'emitReceivedMessage':", err);
        }
    }
    emitReceivedMessage();
};
