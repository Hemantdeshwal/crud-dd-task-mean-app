import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TutorialService } from './tutorial.service';

describe('TutorialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(TutorialService);
    expect(service).toBeTruthy();
  });
});

