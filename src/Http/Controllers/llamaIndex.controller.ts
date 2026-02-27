import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TYPES } from '../../Database/types';
import { LlamaIndexService } from "../../Services";
import { NextFunction, Request, Response } from "express";

@injectable()
export class LlamaIndexController {
    private llamaIndexService: LlamaIndexService;

    constructor(
        @inject(TYPES.LlamaIndexService) llamaIndexService: LlamaIndexService,
    ) {
        this.llamaIndexService = llamaIndexService;
    }

    createIndexFromText() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { content } = req.body;
                const result = await this.llamaIndexService.createIndexFromText(content);
                return res.status(200).json({ message: result });
            } catch (err) {
                return next(err);
            }
        }
    }

    queryFile() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { question } = req.body;
                const answer = await this.llamaIndexService.queryFile(question);
                return res.status(200).json({ answer });
            } catch (err) {
                return next(err);
            }
        }
    }
}