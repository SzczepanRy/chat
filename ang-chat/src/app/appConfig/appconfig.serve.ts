import { InjectionToken } from '@angular/core';
import { AppConfig } from './appconfig.interface';

export const APP_SERVICE_CONF = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
  url: 'http://localhost:3000/',
};
