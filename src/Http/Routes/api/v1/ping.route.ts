import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { PingController } from "../../../Controllers";

export class PingRoute {
    router: Router = Router();
    private pingController: PingController;

    constructor() {
        this.pingController = AppServiceProvider.getContainer().resolve(PingController);
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            "/v1/wake-up/ping",
            this.pingController.PingWakeupServer()
        );
    }
};

export default new PingRoute().router;