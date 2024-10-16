import { Provider } from '@angular/core';
import { DeleteUsecase, GetUsecase, ListUsecase } from '../../domain/accounts-type/usecases';
import { AccountsTypeStoreAdapter } from './state/store.adapter';

export const AccountsTypeListUsecaseProvider: Provider = {
  provide: ListUsecase, 
  deps: [AccountsTypeStoreAdapter],
  useFactory: (storeGateway: AccountsTypeStoreAdapter) => new ListUsecase(storeGateway)
}

export const AccountsTypeGetUsecaseProvider: Provider = {
  provide: GetUsecase, 
  deps: [AccountsTypeStoreAdapter],
  useFactory: (storeGateway: AccountsTypeStoreAdapter) => new GetUsecase(storeGateway)
}