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

  user: User
  profile: any
  apiErrorResponse: string

  heroku = 'https://lit-fjord-04089.herokuapp.com/';
  userUrl = 'http://cycling_hub_api.test/';
  macLocal = 'http://localhost:8888/TM470/laraPassport_cycling_api/public/'
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

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  getUserApi(): Observable<any> {
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
    console.log('User Stored');
    return true;
  }

  clearUser() {
    this.user = undefined;
    console.log('User Cleared');
    return true;
  }

  async getUser() {
    return new Promise<User>((resolve, reject) => {
      if (this.user) {
        console.log('User Cache');
        resolve(this.user);
      } else {
        console.log('User API');
        this.getUserApi()
          .subscribe(
            res => {
              this.storeUser(res[0])
              resolve(this.user);
            })
        error => {
          reject(error.message)
        }
      }
    })
  }

  profilePopulated(profile: any) {
    if (!this.user.user_profile) {
      return false;
    } else if (this.user.user_profile === null) {
      return false;
    } else {
      return true;
    }
  }

  getUserClubAdmin(id: any) {
    if (this.user && this.user.cycling_club_admin) {
      let clubsArray = this.user.cycling_club_admin
      let club = clubsArray.find(clubs => clubs.id == id)
      return club;
    }
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
