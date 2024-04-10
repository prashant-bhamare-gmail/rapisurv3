import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { mockedEnv } from '../shared/environment.mocked';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { FileService } from './file.service';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FileService,
      JwtHelperService,
      { provide: ENVIRONMENT_INJECT_TOKEN, useValue: mockedEnv },
    ],
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
