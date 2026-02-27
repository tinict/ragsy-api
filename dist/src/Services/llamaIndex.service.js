"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamaIndexService = void 0;
const inversify_1 = require("inversify");
const llamaindex_1 = require("llamaindex");
// import { OpenAIEmbedding } from '@llamaindex/openai';
const huggingface_1 = require("@llamaindex/huggingface");
const groq_1 = require("@llamaindex/groq");
llamaindex_1.Settings.embedModel = new huggingface_1.HuggingFaceEmbedding({
    modelType: "Xenova/all-MiniLM-L6-v2"
});
llamaindex_1.Settings.llm = new groq_1.Groq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
});
let LlamaIndexService = class LlamaIndexService {
    constructor() {
        this.index = null;
    }
    async createIndexFromText(content) {
        const doc = new llamaindex_1.Document({ text: content });
        this.index = await llamaindex_1.VectorStoreIndex.fromDocuments([doc]);
        return "Index created successfully";
    }
    async queryFile(question) {
        if (!this.index) {
            throw new Error("Index chưa được tạo");
        }
        const queryEngine = this.index.asQueryEngine();
        const response = await queryEngine.query({
            query: question
        });
        return response.toString();
    }
};
exports.LlamaIndexService = LlamaIndexService;
exports.LlamaIndexService = LlamaIndexService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], LlamaIndexService);
