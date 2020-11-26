import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../_models/movie';
import { favoriteMovieCorrelation } from '../_models/favoriteMovieCorrelation';
import { FavoriteMovie } from '../_models/favoritemovie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
    title: string;
    constructor(private http: HttpClient) {}
  
    getMovies(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
    }

    getMovieById(id: string): Observable<Movie> {
      return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
    }

    addMovie(movie: Movie): Observable<Movie> {
      return this.http.post<Movie>(`${environment.apiUrl}/movies`, movie);
    }
  
    updateMovie(
      movie: Movie,
      id: string
    ): Observable<Movie> {
      return this.http.put<Movie>(`${environment.apiUrl}/movies/${id}`, movie);
    }
  
    deleteMovie(id: string): Observable<Movie> {
      return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`);
    }

    getFavoriteMovies(title?: string): Observable<FavoriteMovie[]> {
      return this.http.get<FavoriteMovie[]>(`${environment.apiUrl}/users/favorites?title=${title}`);
    }

  favoriteMovie(id: string) {
    return this.http.post<favoriteMovieCorrelation>(
      `${environment.apiUrl}/users/favorites`,
      {
        movieId: id,
      }
    );
  }

  deleteFavoriteMovie(id: string) {
    return this.http
      .delete<favoriteMovieCorrelation>(
        `${environment.apiUrl}/users/favorites/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  
  }