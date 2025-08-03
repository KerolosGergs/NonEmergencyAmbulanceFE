import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
  provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),       // Required for animations
    // Required for animations
    provideToastr({
      timeOut: 4000, // ✔️ Auto dismiss after 4s
      extendedTimeOut: 1000,
      closeButton: true, // ✔️ Show close button
      tapToDismiss: true, // ✔️ Allow clicking anywhere to dismiss
      progressBar: true,
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr animate__animated animate__fadeInDown', // ✔️ Animate.css support
      preventDuplicates: true,
      enableHtml: false
    }),
     BrowserAnimationsModule,
  ]
};
