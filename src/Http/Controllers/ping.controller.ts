import 'reflect-metadata';
import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

@injectable()
export class PingController {
    constructor() { };

    PingWakeupServer() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                return res.status(200).json({ version: "0.1.0" });
            } catch (err) {
                return next(err);
            }
        }
    }
}