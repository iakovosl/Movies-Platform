import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MoviesListComponent } from './movies-list/movies-list.component';
import { LayoutComponent } from './layout/layout.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';


const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: '', component: MoviesListComponent },
        { path: 'new', component: MovieDetailsComponent },
        { path: 'favorite', component: FavoriteMoviesComponent },
        { path: ':id', component: MovieDisplayComponent },
        { path: 'edit/:id', component: MovieDetailsComponent },
      ],
    },
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule { }