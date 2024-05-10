import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import localeSe from '@angular/common/locales/sv';
import localeSeExtra from '@angular/common/locales/extra/sv';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';

registerLocaleData(localeSe, localeSeExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'sv-SE' },
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
