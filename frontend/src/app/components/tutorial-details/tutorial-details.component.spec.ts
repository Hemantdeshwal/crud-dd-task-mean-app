import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TutorialDetailsComponent } from './tutorial-details.component';
import { TutorialService } from '../../services/tutorial.service';

describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        TutorialService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' },
              paramMap: { get: () => '1' },
            },
            params: of({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

