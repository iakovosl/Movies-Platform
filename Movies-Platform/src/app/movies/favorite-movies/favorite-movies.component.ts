import { Component, OnInit } from '@angular/core';
import { MovieService } from '@app/_services';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.less']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovie = null;
  movies = null;
  filteredMovie = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.userService.getFavoriteMovies()
              .pipe(first())
              .subscribe(movies =>{
                this.favoriteMovie = movies;
                this.filteredMovie = movies;
              });
    }

  deleteFavoriteMovie(id: string) {
      const movie = this.favoriteMovie.find(x => x.favoriteId === id);
      movie.isDeleting = true;
      this.userService.deleteFavoriteMovie(id)
          .subscribe(() =>{
             this.favoriteMovie = this.favoriteMovie.filter(x => x.favoriteId !== movie.favoriteId);
             this.filteredMovie = this.filteredMovie.filter(x => x.favoriteId !== movie.favoriteId);
            });
  }

  
  }
  


