import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.getTutorial(id);
      }
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => (this.currentTutorial = data),
      error: (err) => console.error(err)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: () => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      },
      error: (err) => console.error(err)
    });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: () => {
        this.message = 'The tutorial was updated successfully!';
      },
      error: (err) => console.error(err)
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: () => {
        this.message = 'The tutorial was deleted successfully!';
      },
      error: (err) => console.error(err)
    });
  }
}
