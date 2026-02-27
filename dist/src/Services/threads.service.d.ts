import 'reflect-metadata';
export declare class ThreadService {
    constructor();
    getThreads(): Promise<{}[]>;
    generateThreadID(): Promise<string>;
    createThread(threadModel: any): Promise<void>;
    deleteThread(threadID: any): Promise<void>;
}
