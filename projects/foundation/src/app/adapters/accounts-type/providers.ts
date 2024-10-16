import { Provider } from '@angular/core';
import { GetUsecase, ListUsecase } from '../../domain/accounts-type/usecases';
import { AccountsTypeStoreAdapter } from './state/store.adapter';

export const accountsTypeListUsecaseProvider: Provider = {
  provide: ListUsecase,
  deps: [AccountsTypeStoreAdapter],
  useFactory: (storeGateway: AccountsTypeStoreAdapter) => new ListUsecase(storeGateway),
};

export const accountsTypeGetUsecaseProvider: Provider = {
  provide: GetUsecase,
  deps: [AccountsTypeStoreAdapter],
  useFactory: (storeGateway: AccountsTypeStoreAdapter) => new GetUsecase(storeGateway),
};
