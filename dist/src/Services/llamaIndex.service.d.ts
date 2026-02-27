export declare class LlamaIndexService {
    private index;
    constructor();
    createIndexFromText(content: string): Promise<string>;
    queryFile(question: string): Promise<string>;
}
