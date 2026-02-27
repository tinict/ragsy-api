import 'reflect-metadata';
import { LlamaIndexService } from "../../Services";
import { NextFunction, Request, Response } from "express";
export declare class LlamaIndexController {
    private llamaIndexService;
    constructor(llamaIndexService: LlamaIndexService);
    createIndexFromText(): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    queryFile(): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}
