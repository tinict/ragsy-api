import 'reflect-metadata';
import { MessageService } from "../../Services";
import { NextFunction, Request, Response } from "express";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    getMessagesInThread(): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createMeasageInThread(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
