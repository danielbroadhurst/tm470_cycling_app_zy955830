import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HereMapsService {

  constructor(private http: HttpClient) { }
  private apiKey = 'G6mTJYafb80IXTTa_7-yEFtwaGZBKYQIY59Ug2X0ekI';
  //https://geocoder.ls.hereapi.com/search/6.2/geocode.json
  private geocoderProxUrl = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';

  getRelatedAreas(location: any): Observable<any> { 
    let params = {
        prox: `${location.coords.latitude},${location.coords.longitude}`,
        mode: 'retrieveAreas',
        apiKey: this.apiKey,
    }    
    return this.http.get<any>(`${this.geocoderProxUrl}`, {params})
    .pipe(
      map(results => {        
        return results.Response.View[0].Result[0].Location.Address
      }),
      catchError(this.handleError)
    )
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
