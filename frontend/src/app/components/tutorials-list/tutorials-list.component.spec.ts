import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TutorialsListComponent } from './tutorials-list.component';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  template: ''
})
class TutorialDetailsStubComponent {
  @Input() viewMode: boolean | undefined;
  @Input() currentTutorial: any;
}

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent, TutorialDetailsStubComponent],
      imports: [HttpClientTestingModule, FormsModule],
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

    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

