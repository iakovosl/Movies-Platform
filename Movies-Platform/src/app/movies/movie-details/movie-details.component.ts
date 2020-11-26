import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MovieService} from '@app/_services';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.less']
})
export class MovieDetailsComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private movieService: MovieService,
      
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
      this.form = this.formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          dateReleased: ['', Validators.required],
      });

      if (!this.isAddMode) {
          this.movieService.getMovieById(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.addMovie();
      } else {
          this.updateMovie();
      }
  }

  private addMovie() {
      this.movieService.addMovie(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
            
                  this.router.navigate(['movies'], { relativeTo: this.route });
              },
              error: error => {
               
                  this.loading = false;
              }
          });
  }

  private updateMovie() {
      this.movieService.updateMovie(this.form.value, this.id)
          .pipe(first())
          .subscribe({
              next: () => {
                 
                  this.router.navigate(['movies'], { relativeTo: this.route });
              },
              error: error => {
                 
                  this.loading = false;
              }
          });
  }
}

