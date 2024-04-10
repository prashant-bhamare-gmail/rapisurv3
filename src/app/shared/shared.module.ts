import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import {
  WebStorageService,
  STORAGE_KEY_TOKEN,
  EStorageTarget,
} from '../shared/services/public-api';
import { AuthInterceptor } from "./services/lib/shared/auth-interceptor";
import { environment } from '../../environments/environment.prod';
const backendUrl = environment.backend.baseUrl
  .replace(/^https?:\/\//, '')
  .replace(/\/.*/, ''); 

export function jwtOptionsFactory(storageService: WebStorageService) {
  return {
    tokenGetter: () => {
      const token = storageService.getItem(STORAGE_KEY_TOKEN, {
        target: EStorageTarget.LocalStorage,
      })
        ? storageService.getItem(STORAGE_KEY_TOKEN, {
            target: EStorageTarget.LocalStorage,
          })
        : storageService.getItem(STORAGE_KEY_TOKEN, {
            target: EStorageTarget.SessionStorage,
          });
      return token;
    },
    // https://gitlab.com/dej-rs-projects/frontend-web-template/issues/4
    whitelistedDomains: [backendUrl],
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [WebStorageService],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
  ],
})
export class SharedModule {}
