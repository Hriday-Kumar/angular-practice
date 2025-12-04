import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterModule } from "@angular/router";
import { InfiniteScrollCustomEvent, IonAlert, IonAvatar, IonBadge, IonContent, IonHeader, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonRouterLink, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { Movie } from '../services/movie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInfiniteScrollContent, IonAlert, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText, IonAvatar, IonLabel, IonItem, IonInfiniteScroll, IonThumbnail, IonRouterLink, IonItem, RouterModule, IonBadge],
})
export class HomePage {
  private movieService = inject(Movie);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);

  constructor() {
    this.loadMovies();
  }
  loadMovies(event?: InfiniteScrollCustomEvent) {
     this.error = null;
     if(!event) {
      this.isLoading = true;
     }
     this.movieService.getTopratedMovies(this.currentPage).pipe(
       finalize(() => {
        this.isLoading = false;
        if(event) {
          event.target.complete();
        }
       }), catchError((err : any) => {
        console.log(err);
        this.error = err.error.statsus_message || 'An error occurred while fetching data.';
        return [];
       })
     ).subscribe({
       next: (res) => {
        this.movies.push(...res.results);
        console.log('all data', res.results);
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
       }
     })

      
    }
    loadMore(event: InfiniteScrollCustomEvent ) {
      this.currentPage++;
      this.loadMovies(event);
    }
  
}
