import 'reflect-metadata';
export declare class MessageService {
    constructor();
    generateThreadID(): Promise<string>;
    getMessages(thread_id: any): Promise<any[]>;
    createMessage(createMessageModel: any): Promise<void>;
}
