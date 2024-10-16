import { Observable, Unsubscribable } from "rxjs";
import { Id } from "../../shared/valueObjects/id.vo";
import { BaseUsecase } from "../base/usecase";
import { AccountsType } from "./models";

export class ListUsecase extends BaseUsecase<AccountsType> {
    override execute(): Unsubscribable {
        return this.storeGateway.load();
    }
}

export class GetUsecase extends BaseUsecase<AccountsType> {
    override execute(id: Id): Unsubscribable {
        return this.storeGateway.read(id);
    }
}

export class PostUsecase extends BaseUsecase<AccountsType> {
    override execute(model: AccountsType): Unsubscribable {
        return this.storeGateway.save(model);
    }
}

export class PutUsecase extends BaseUsecase<AccountsType> {
    override execute(id: Id, model: AccountsType): Unsubscribable {
        return this.storeGateway.update(id, model);
    }
}

export class DeleteUsecase extends BaseUsecase<AccountsType> {
    override execute(id: Id): Unsubscribable {
        return this.storeGateway.delete(id);
    }
}