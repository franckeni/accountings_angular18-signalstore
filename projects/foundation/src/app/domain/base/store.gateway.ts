import { Unsubscribable } from "rxjs";
import { Id } from "../../shared/valueObjects/id.vo";

export interface BaseStoreGateway<T> {
    load(): Unsubscribable;
    read(id: Id): Unsubscribable;
    save(model: T): Unsubscribable;
    update(id: Id, model: T): Unsubscribable;
    delete(id: Id): Unsubscribable;
}