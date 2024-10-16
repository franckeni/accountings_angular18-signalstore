import { Injectable, inject } from "@angular/core";
import { AccountsType, AccountsTypeUpdate } from "../../../domain/accounts-type/models";
import { BaseStoreGateway } from "../../../domain/base/store.gateway";
import { Id } from "../../../shared/valueObjects/id.vo";
import { AccountsTypeStore } from "./store.state";
import { Unsubscribable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AccountsTypeStoreAdapter implements BaseStoreGateway<AccountsType> {
    store = inject(AccountsTypeStore)

    load(): Unsubscribable {
        return this.store.load();
    }

    read(id: Id): Unsubscribable {
        return this.store.read({id})
    }

    save(model: AccountsType): Unsubscribable {
        return this.store.save({accountsType:model});
    }

    update(id: Id, model: AccountsTypeUpdate): Unsubscribable {
        return this.store.update({id, accountsType: model});
    }

    delete(id: Id): Unsubscribable {
        return this.store.delete({id});
    }
}
