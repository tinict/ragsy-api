import { injectable } from "inversify";
import { Document, Settings, VectorStoreIndex, } from "llamaindex";
// import { OpenAIEmbedding } from '@llamaindex/openai';
import { HuggingFaceEmbedding } from '@llamaindex/huggingface';
import { Groq } from '@llamaindex/groq';

Settings.embedModel = new HuggingFaceEmbedding({
    modelType: "Xenova/all-MiniLM-L6-v2"
});

Settings.llm = new Groq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
});

@injectable()
export class LlamaIndexService {
    private index: VectorStoreIndex | null = null;

    constructor() { }

    async createIndexFromText(content: string) {
        const doc = new Document({ text: content });
        this.index = await VectorStoreIndex.fromDocuments([doc]);
        return "Index created successfully";
    }

    async queryFile(question: string): Promise<string> {
        if (!this.index) {
            throw new Error("Index chưa được tạo");
        }
        const queryEngine = this.index.asQueryEngine();

        const response = await queryEngine.query({
            query: question
        });

        return response.toString();
    }
}