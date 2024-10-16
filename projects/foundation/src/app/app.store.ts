import { getState, patchState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { PLATFORM_ID, computed, effect, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ErrorType } from "./shared/models/error";

export interface RootState {
    appName: string;
    currentPage: {title: string};
    isLoading: boolean;
    error?: ErrorType;
};

export const initialState: RootState = {
    appName: 'Angular 18, Ngrx SignalStore and SSR in Clean Architecture',
    currentPage: {title: 'Home'},
    isLoading: false,
    error: null
};

export const RootStore = signalStore(
    { providedIn: 'root' },
    withState<RootState>(initialState),
    withLogger('rootState'),
    withComputed((store) => ({
        translatedTitle: computed(() => store.currentPage.title()),
    })),
    withMethods((store) => ({
        changePageTitle(title: string, url?: string) { patchState(store, { currentPage: {title: title }});
        }})),
    withHooks({
        onInit(store, platformId = inject(PLATFORM_ID)) {
            const state = getState(store);
            const isInitialState: boolean = JSON.stringify(state) === JSON.stringify(initialState);

            // Log / Save in Localstorage or Sessionstorage
            if (isPlatformBrowser(platformId) && isInitialState) {
                const storageValue = localStorage.getItem('rootState');
                const isNewStateFromStorage: boolean = JSON.stringify(state) !== storageValue;
                // Initialize localstorage with initialState
                if (isNewStateFromStorage) {
                    const newValues: RootState = JSON.parse(storageValue!)
                    patchState(store, {...newValues, isLoading: false})
                }
            }
        },
    })
)

export function withLogger(name: string) {
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
                }
            }
          });
        },
      })
    );
}