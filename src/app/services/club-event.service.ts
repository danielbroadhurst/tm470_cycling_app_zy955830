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

  viewClubEvents(id?: string|boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.http.get<ClubEvent>(`${this.macLocal}${this.clubEventEndpoint}/${id}`, httpOptions)
      .pipe(
        map(result => {          
          if (result.profile_picture) {
            let profileUrl = `${this.macLocal}${result.profile_picture}`;
            result.profile_picture = profileUrl;
          }
          if (result.hasOwnProperty('attendees')) {
            if (result.attendees.length > 0) {
              this.generatePictureUrl(result.attendees);
            }
          }
          return result;
        }),
        catchError(this.handleError)
      )
  }

  private generatePictureUrl(array: any) {
    if (array !== Object) {
      for (let i = 0; i < array.length; i++) {
        const club = array[i];
        if (club.profile_picture) {
          let profileUrl = `${this.macLocal}${club.profile_picture}`;
          array[i].profile_picture = profileUrl;
        }
        if (club.events) {
          this.generatePictureUrl(club.events);
        }
      }
    } else {
      this.generatePictureUrl(array);
    }
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
