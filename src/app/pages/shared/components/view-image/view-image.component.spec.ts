import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ServicesModule,
} from '../../../../shared/services/public-api';

import { ViewImageComponent } from './view-image.component';
import { environment } from '@environment/environment';

describe('ViewImageComponent', () => {
  let component: ViewImageComponent;
  let fixture: ComponentFixture<ViewImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewImageComponent],
      imports: [
        HttpClientTestingModule,
        NgbModalModule,
        ServicesModule.forRoot(environment),
      ],
      providers: [
        NgbActiveModal,
        { provide: JwtHelperService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
