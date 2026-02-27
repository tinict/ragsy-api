import { Container } from 'inversify';
declare class AppServiceProvider {
    private container;
    constructor();
    register(): void;
    getContainer(): Container;
}
declare const _default: AppServiceProvider;
export default _default;
