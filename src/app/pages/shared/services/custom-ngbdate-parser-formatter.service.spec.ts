import { TestBed, inject } from '@angular/core/testing';

import { CustomNgbDateParserFormatterService } from './custom-ngbdate-parser-formatter.service';

describe('CustomNgbDateParserFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomNgbDateParserFormatterService],
    });
  });

  it('should be created', inject(
    [CustomNgbDateParserFormatterService],
    (service: CustomNgbDateParserFormatterService) => {
      expect(service).toBeTruthy();
    },
  ));
});
