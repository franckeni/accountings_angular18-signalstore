import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { SettingsService } from '../services/settings.service';

const appSettings = () => {
  const settingsService = inject(SettingsService);
  return () => settingsService.load();
};

export function provideSettingInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: appSettings,
    multi: true,
    deps: [SettingsService],
  };
}
