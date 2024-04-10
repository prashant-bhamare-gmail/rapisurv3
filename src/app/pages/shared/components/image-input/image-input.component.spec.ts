import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ImageInputComponent } from './image-input.component';
import { FileSizePipe } from '@shared/application/pipes/file-size/file-size.pipe';

describe('ImageInputComponent', () => {
  let component: ImageInputComponent;
  let fixture: ComponentFixture<ImageInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ImageInputComponent, FileSizePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
