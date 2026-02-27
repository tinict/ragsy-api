import { Router } from "express";
import AppServiceProvider from "../../../../Providers/AppServiceProvider";
import { LlamaIndexController } from "../../../Controllers/llamaIndex.controller";

export class LlamaIndexRoute {
    router: Router = Router();
    private llamaIndexController: LlamaIndexController;

    constructor() {
        this.llamaIndexController = AppServiceProvider.getContainer().resolve(LlamaIndexController);
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Tạo index từ nội dung file
        this.router.post(
            "/v1/index",
            this.llamaIndexController.createIndexFromText()
        );

        // Query nội dung trong file
        this.router.post(
            "/v1/query",
            this.llamaIndexController.queryFile()
        );
    }
};

export default new LlamaIndexRoute().router;