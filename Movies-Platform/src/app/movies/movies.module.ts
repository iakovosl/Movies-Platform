import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LayoutComponent } from './layout/layout.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';



@NgModule({
  declarations: [MoviesListComponent, LayoutComponent, MovieDetailsComponent, FavoriteMoviesComponent, MovieDisplayComponent,],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class MoviesModule { }
