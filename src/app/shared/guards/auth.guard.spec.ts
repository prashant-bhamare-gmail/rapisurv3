import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ServicesModule } from '../../shared/services/public-api';

import { AuthGuard } from './auth.guard';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@environment/environment';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [
        RouterTestingModule,
        SharedModule,
        ServicesModule.forRoot(environment),
      ],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
