import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params['id']);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: () => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: () => {
        this.message = 'The tutorial was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: () => {
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}

