import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Array<any>;

  macLocal ='http://localhost:8888/TM470/laraPassport_cycling_api/public/'
  countriesEndpoint = 'api/countries';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initCountries;
  }

  initCountries(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`${this.macLocal}${this.countriesEndpoint}`, httpOptions)
    .pipe(      
      catchError(this.handleError)
    ) 
  }

  storeCountries(countriesArray) {
    this.countries = countriesArray;
  }

  getCountries() {
    return this.countries;
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
