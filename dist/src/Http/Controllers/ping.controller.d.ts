import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";
export declare class PingController {
    constructor();
    PingWakeupServer(): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}
