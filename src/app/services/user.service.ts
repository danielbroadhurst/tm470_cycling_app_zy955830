import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators/'; 
import { User } from '../classes/userClass';
import { Router } from '@angular/router';
import { Profile } from '../classes/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  user: any
  apiErrorResponse: string

  heroku = 'https://lit-fjord-04089.herokuapp.com/';
  userUrl = 'http://cycling_hub_api.test/';
  macLocal ='http://localhost:8888/TM470/laraPassport_cycling_api/public/'
  userEndpoint = 'api/user';
  profileEndpoint = 'api/user-profile';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/']); // navigating to LoginComponent      
    }
  }

  initUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<User>(`${this.macLocal}${this.userEndpoint}`, httpOptions)
    .pipe(
      catchError(this.handleError)
    ) 
  }

  createProfile(profile: Profile): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<Profile>(`${this.macLocal}${this.profileEndpoint}`, profile, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  storeUser(user: User) {
    this.user = user;
    return true;
  }

  getLoggedUser() {    
    return this.user;
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
