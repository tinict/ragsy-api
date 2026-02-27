import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { 
    LlamaIndexService,
    MessageService,
    ThreadService, 
} from '../Services';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<MessageService>(TYPES.MessageService).to(MessageService);
        this.container.bind<ThreadService>(TYPES.ThreadService).to(ThreadService);
        this.container.bind<LlamaIndexService>(TYPES.LlamaIndexService).to(LlamaIndexService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;
