import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { Movie } from '../_models/movie';
import { favoriteMovieCorrelation } from '../_models';



@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private accountService: AccountService) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/details`);
  }

  updateUser(valueschanged) {
    return this.http.put<User>(`${environment.apiUrl}/users/`, valueschanged).pipe(map((user) => {return user;}));
  }

  deleteUser(): Observable<User> {
    return this.http
      .delete<User>(`${environment.apiUrl}/users`)
      .pipe(tap((_) => this.accountService.logout()));
  }

  getFavoriteMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${environment.apiUrl}/users/favorites`)
      .pipe(delay(100));
  }

  addFavoriteMovie(movie: Movie): Observable<favoriteMovieCorrelation> {
    return this.http.post<favoriteMovieCorrelation>(`${environment.apiUrl}/users/favorites`,
      {
        movieId: movie.id,
      }
    );
  }

  deleteFavoriteMovie(id: string): Observable<favoriteMovieCorrelation> {
    return this.http.delete<favoriteMovieCorrelation>(`${environment.apiUrl}/users/favorites/${id}`);
  }

}