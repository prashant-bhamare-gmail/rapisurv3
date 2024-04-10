import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { StorageService, EStorageTarget } from './storage.service';
import { ENVIRONMENT_INJECT_TOKEN } from './constants';
import { mockedEnv } from './environment.mocked';

export function jwtOptionsFactory(storageService: StorageService) {
  return {
    tokenGetter: () => {
      const token =
        this.storageService.getItem('token', {
          target: EStorageTarget.LocalStorage,
        }) ||
        this.storageService.getItem('token', {
          target: EStorageTarget.SessionStorage,
        });
      return token;
    },
    whitelistedDomains: [''],
  };
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory,
            deps: [StorageService],
          },
        }),
      ],
      providers: [
        AuthService,
        JwtHelperService,
        { provide: ENVIRONMENT_INJECT_TOKEN, useValue: mockedEnv },
      ],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  // TODO
});
