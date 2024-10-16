import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISetting } from '../../domain/base/model';

export interface SettingState {
  isLoaded: boolean;
  data: ISetting | null;
}

const initialState: SettingState = {
  isLoaded: false,
  data: null,
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly state = new BehaviorSubject<SettingState>(initialState);
  public readonly state$ = this.state.asObservable();

  constructor(private _http: HttpClient) {}

  load(): Observable<void> {
    return this._http.get<ISetting>('assets/env.json').pipe(
      map((config) => {
        this.state.next({
          isLoaded: true,
          data: config.services.api.baseUrl.startsWith('$') ? environment : config,
        });
      }),
    );
  }

  // Get the first config from observable when the env.json file is loaded
  getConfig(): ISetting | null | undefined {
    return toSignal(
      this.state$.pipe(
        first((config) => config.isLoaded),
        map(({ data }) => data),
      ),
    )();
  }
}
