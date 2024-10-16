import { getState, patchState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PLATFORM_ID, computed, effect, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { isPlatformBrowser } from "@angular/common";
import { ErrorType } from "../../../shared/models/error";
import { ErrorService } from "../../../shared/services/error.service";
import { AccountsTypeListResponseDTO, AccountsType, AccountsTypeUpdate, AccountsTypeResponseDTO } from "../../../domain/accounts-type/models";
import { Id } from "../../../shared/valueObjects/id.vo";
import { AccountsTypeState, initialState } from "./models";
import { BUTTON_LABELS } from "../../../shared/utils/constants";
import { AccountsTypeRepositoryService } from "../repositories/repository.service";

const ACCOUNTS_TYPE_STATE_KEY = 'accountsTypeState';

function withLogger(name: string) {
    return signalStoreFeature(
      withHooks({
        onInit(store, platformId = inject(PLATFORM_ID)) {
          effect(() => {
            const state = getState(store);
            const isInitialState: boolean = JSON.stringify(state) === JSON.stringify(initialState);
            // Log / Save in Localstorage or Sessionstorage
            if (isPlatformBrowser(platformId)) {

                const storageValue = localStorage.getItem(name);
                if (!isInitialState) {
                    const isNewStateToStorage: boolean = JSON.stringify(state) !== storageValue;
                    if (isNewStateToStorage && !!storageValue) {
                        localStorage.setItem(name, JSON.stringify(state))
                    }
                } else {
                    // Initialize localstorage with initialState
                    if (!!!storageValue) {
                        localStorage.setItem(name, JSON.stringify(state))
                    }
                }}
          });
        },
      })
    );
}

export const AccountsTypeStore = signalStore(
    { providedIn: 'root' },
    withState<AccountsTypeState>(initialState),
    withComputed((store) => ({
        dialogHadBeenOpenedAndItemSelected: computed(() => store.selected !== null && store.dialog.opened()),
        showList: computed(() => store.error!() === null && store.items().length > 0)
    })),
    withMethods((store, 
        repositoryService = inject(AccountsTypeRepositoryService), 
        errorService = inject(ErrorService)) => {
        return {
            load: rxMethod<void>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap(() => {
                        return repositoryService.fetchAll().pipe(
                            tapResponse({
                                next: (response: AccountsTypeListResponseDTO) => 
                                    patchState(store, {items: response, error: null, createdOrUpdated: null}),
                                error: (error: ErrorType) => 
                                    patchState(store, {error: errorService.handleError(error)}),
                                finalize: () => { patchState(store, {isLoading: false}); }
                        }))
                    })
                )
            ),
            read: rxMethod<{id: Id}>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap((params) => {
                        return repositoryService.findOne(params.id).pipe(
                            tapResponse({
                                next: (response: AccountsTypeResponseDTO) => 
                                    patchState(store, {selected: response, error: null, createdOrUpdated: null}),
                                error: (error: ErrorType) => 
                                    patchState(store, {error: errorService.handleError(error)}),
                                finalize: () => { patchState(store, {isLoading: false}); }
                        }))
                    })
                )
            ),
            save: rxMethod<{accountsType: AccountsType}>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap((params) => {
                        return repositoryService.create(params.accountsType).pipe(
                            tapResponse({
                                next: (response: AccountsTypeResponseDTO) => {
                                    patchState(store, {error: null, items: [...store.items(), response], createdOrUpdated: true})},
                                error: (error: ErrorType) => 
                                    patchState(store, {error: errorService.handleError(error), createdOrUpdated: null}),
                                finalize: () => {
                                    patchState(store, {isLoading: false})}
                        }))
                    })
                )
            ),
            update: rxMethod<{id: Id, accountsType: AccountsTypeUpdate}>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap((params) => {
                        return repositoryService.update(params.id, params.accountsType).pipe(
                            tapResponse({
                                next: (response: AccountsTypeResponseDTO) => {

                                    const sorted = [...store.items()]
                                    const index = sorted.findIndex((x: any) => x['id'] == response.id);
                                    sorted[index] = response;

                                    patchState(store, {error: null, items: sorted, createdOrUpdated: true})},
                                error: (error: ErrorType) => 
                                    patchState(store, {error: errorService.handleError(error), createdOrUpdated: null}),
                                finalize: () => { patchState(store, {isLoading: false});}
                        }))
                    })
                )
            ),
            delete: rxMethod<{id: Id}>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap((params) => {
                        return repositoryService.delete(params.id).pipe(
                            tapResponse({
                                next: (response: boolean) => {

                                    const items = [...store.items()]
                                    const newSorted = items.filter((x: any) => x['id'] !== params.id.value!);

                                    patchState(store, {error: null, items: newSorted, createdOrUpdated: true})},
                                error: (error: ErrorType) => 
                                    patchState(store, {error: errorService.handleError(error), createdOrUpdated: null}),
                                finalize: () => { patchState(store, {isLoading: false}); }
                        }))
                    })
                )
            ),
            resetSelected: () => {
                patchState(store, {selected: null, error: null, createdOrUpdated: null})
            },
            toggleDialogHadBeenOpened: (opened: boolean, title: string, action: string,
                submitButtonText?: string, cancelButtonText: string = BUTTON_LABELS.dialog.cancel) => {
                patchState(store, {dialog: 
                    {opened: opened, title: title, action: action, submitButtonText: submitButtonText, cancelButtonText: cancelButtonText}})
            },
            updateItemInList: (item: AccountsType) => {
                const list = {...store.items, item}
                patchState(store, {error: null, items: list})}
    }}),
    withLogger(ACCOUNTS_TYPE_STATE_KEY),
    withHooks({
        onInit(store, platformId = inject(PLATFORM_ID)) {
            const state = getState(store);
            const isInitialState: boolean = JSON.stringify(state) === JSON.stringify(initialState);

            // Load AccountsType List from backend
            store.load();

            // Log / Save in Localstorage or Sessionstorage
            if (isPlatformBrowser(platformId) && isInitialState) {
                const storageValue = localStorage.getItem(ACCOUNTS_TYPE_STATE_KEY);
                const isNewStateFromStorage: boolean = JSON.stringify(state) !== storageValue;
                // Initialize localstorage with initialState
                if (isNewStateFromStorage) {
                    const newValues: AccountsTypeState = JSON.parse(storageValue!)
                    patchState(store, {...newValues, isLoading: false})
                }
            }
        },
    })
)