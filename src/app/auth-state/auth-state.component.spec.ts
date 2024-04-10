import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ServicesModule } from 'yeta-services';
import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@environment/environment';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ThemeModule.forRoot(),
        ReactiveFormsModule,
        SharedModule,
        ServicesModule.forRoot(environment),
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
