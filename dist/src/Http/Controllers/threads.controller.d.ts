import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { ThreadService } from '../../Services';
export declare class ThreadController {
    private threadService;
    constructor(threadService: ThreadService);
    getThreads(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createThreads(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteThreads(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
