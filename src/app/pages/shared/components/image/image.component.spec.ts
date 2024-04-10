import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServicesModule } from '../../../../shared/services/public-api';

import { ImageComponent } from './image.component';
import { environment } from '@environment/environment';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ServicesModule.forRoot(environment)],
      declarations: [ImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
