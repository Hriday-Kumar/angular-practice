import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';
import { delay, Observable } from 'rxjs';

const API_KEY = environment.apiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

console.log('print api key', API_KEY)
@Injectable({
  providedIn: 'root',
})
export class Movie {
  private http = inject(HttpClient);
  constructor() {
  }
  getTopratedMovies(page = 1): Observable<ApiResult> {
   return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
  } 
  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  } 
}
