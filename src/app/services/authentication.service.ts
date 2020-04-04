import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators/'; 

import { UserAuth } from '../interfaces/user-auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable()
export class AuthenticationService {

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  }
  registerUrl = 'http://cycling_hub_api.test/api/register';
  loginUrl = 'http://cycling_hub_api.test/api/login';
  logoutUrl = 'http://cycling_hub_api.test/api/logout';

  constructor(private http: HttpClient) { }

  registerUser(user: UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(this.registerUrl, user)
    .pipe(
      catchError(this.handleError)
    )
  }

  loginUser(user: UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(this.loginUrl, user)
    .pipe(
      catchError(this.handleError)
    )
  }

  logoutUser(): Observable<{}> {
    return this.http.post(this.logoutUrl, null, httpOptions)
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