import { BaseStoreGateway } from "./store.gateway";

export abstract class BaseUsecase<T> {
    constructor(
        protected storeGateway: BaseStoreGateway<T>) {
    }

    abstract execute(args: unknown, kwargs: unknown): unknown;
}