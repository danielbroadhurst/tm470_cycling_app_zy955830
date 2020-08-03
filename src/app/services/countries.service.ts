import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Array<string> = [];

  macLocal = 'http://localhost:8888/TM470/laraPassport_cycling_api/public/'
  heroku = 'https://lit-fjord-04089.herokuapp.com/';
  countriesEndpoint = 'api/countries';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    if (this.countries.length > 0) {
      return Promise.resolve(this.countries);
    }
    return new Promise(resolve => {
      this.http.get(`${this.macLocal}${this.countriesEndpoint}`, httpOptions)
        .pipe(
          map((res: any) => res),
          catchError(this.handleError)
        )
        .subscribe(data => {
          this.storeCountries(data);
          resolve(this.countries);
        });
    });
  }

  storeCountries(countriesArray) {
    this.countries = countriesArray;
  }

  /**
 * 
 * @param error 
 */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,      
      console.error(
        `${error.status} Error:\n` +
        `${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };
}
