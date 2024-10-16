import { Observable } from "rxjs";
import { AccountsTypeListResponseDTO, AccountsType, AccountsTypeUpdate, AccountsTypeResponseDTO } from "./models";
import { Id } from "../../shared/valueObjects/id.vo";

export interface IAccountsTypeRepositoryService {
    fetchAll(access_token?: string, filter?: string): Observable<AccountsTypeListResponseDTO>;
    findOne(id: Id): Observable<AccountsTypeResponseDTO>;
    create(accountsType: AccountsType): Observable<AccountsTypeResponseDTO>;
    update(id: Id, accountsType: AccountsTypeUpdate): Observable<AccountsTypeResponseDTO>;
    delete(id: Id): Observable<boolean>
}