import { Component, OnInit } from '@angular/core';
import { MovieService } from '@app/_services';
import { UserService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Movie } from '@app/_models/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies = null;

  constructor(private movieService: MovieService, private userService: UserService) { }

  ngOnInit(): void {
    this.movieService.getMovies()
            .pipe(first())
            .subscribe(movies => this.movies = movies);

             // add favoriteId to every movie that is included to favorites
    this.userService.getFavoriteMovies().subscribe((movies) => {
      for (let movie of movies) {
        this.movies.map((x) => {
          if (x.id === movie.id) {
            x.favoriteId = movie.favoriteId;
          }
        });
      }
    });
  
  }

  deleteMovie(id: string) {
    const user = this.movies.find(x => x.id === id);
    user.isDeleting = true;
    this.movieService.deleteMovie(id)
        .pipe(first())
        .subscribe(() => this.movies = this.movies.filter(x => x.id !== id));
}

addToFavorites(movie: Movie) {
  this.userService.addFavoriteMovie(movie).subscribe((movie) => {
    //update movies list
    this.movies.map((x) => {
      if (x.id === movie.movieId) {
        x.favoriteId = movie.id;
      }
    });
  });
}

}
