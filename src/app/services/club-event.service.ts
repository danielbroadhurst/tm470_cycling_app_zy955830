import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ClubEvent } from '../classes/club-event';

@Injectable({
  providedIn: 'root'
})
export class ClubEventService {

  constructor(private http: HttpClient) { }

  clubSearchResults: any = null;
  heroku = 'https://lit-fjord-04089.herokuapp.com/';
  userUrl = 'http://cycling_hub_api.test/';
  macLocal = 'http://localhost:8888/TM470/laraPassport_cycling_api/public/'
  clubEventEndpoint = 'api/events';

  // Calls the Create Club API Endpoint with the Cycling Club data provided.
  createClubEvent(clubEvent: ClubEvent): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<ClubEvent>(`${this.macLocal}${this.clubEventEndpoint}`, clubEvent, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  viewClubEvents(location?: string, id?: string|boolean, search?: string): Observable<any> {
    let data = null;
    if (location) {
      data = {
        county: location
      }
    }
    if (id) {
      data = {
        id: id
      }
    }
    if (search) {
      data = {
        search: search
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      params: data
    };
    return this.http.get<ClubEvent[]>(`${this.macLocal}${this.clubEventEndpoint}`, httpOptions)
      .pipe(
        map(result => {
          if (result) {
            result.forEach(club => {
              if (club.profile_picture && club.profile_picture !== null) {
                let profileUrl = `${this.macLocal}${club.profile_picture}`;
                club.profile_picture = profileUrl;
              }
            });
          }
          return result;
        }),
        catchError(this.handleError)
      )
  }

  updateClubEvent(clubEvent: ClubEvent): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };    
    return this.http.put<ClubEvent>(`${this.macLocal}${this.clubEventEndpoint}/${clubEvent.id}`, clubEvent, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteclubEvent(clubEvent: ClubEvent): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<ClubEvent>(`${this.macLocal}${this.clubEventEndpoint}/${clubEvent.id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
  * 
  * @param error 
  */
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,      
      let errors = error.error.errors;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          const message = errors[key];
          errorMessage += `${key} - ${message}\n`
        }
      }
      console.error(
        `${error.status} Error:\n` +
        `${errorMessage}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  };
}
