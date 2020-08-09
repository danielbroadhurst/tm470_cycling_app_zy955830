import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators/';
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

  //heroku = 'https://lit-fjord-04089.herokuapp.com/';
  //userUrl = 'http://cycling_hub_api.test/';
  macLocal = 'http://localhost:8888/TM470/laraPassport_cycling_api/public/'
  userEndpoint = 'api/user';
  deleteUserEndpoint = 'api/delete-account/';
  profileEndpoint = 'api/user-profile';
  joinClubEndpoint = 'api/join-cycling-club/';
  leaveClubEndpoint = 'api/leave-cycling-club/';
  attendClubEventEndpoint = 'api/attend-club-event/';
  leaveClubEventEndpoint = 'api/leave-club-event/';

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
    } else {
      return false;
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

  private urlFormat(result: User) {
    if (result.user_profile !== null) {
      if (result.user_profile && result.user_profile.profile_picture) {
        result.user_profile.profile_picture = `${this.macLocal}${result.user_profile.profile_picture}`;
      }
      if (result.hasOwnProperty('cycling_club_admin')) {
        if (result.cycling_club_admin.length > 0) {
          this.generatePictureUrl(result.cycling_club_admin);
        }
      }
      if (result.hasOwnProperty('cycling_club_member')) {
        if (result.cycling_club_member.length > 0) {
          this.generatePictureUrl(result.cycling_club_member);
        }
      }
      if (result.hasOwnProperty('event_attendee')) {
        if (result.event_attendee.length > 0) {
          this.generatePictureUrl(result.event_attendee);
        }
      }
    }
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
        if (club.map_array && club.map_array !== null) {
          array[i].map_array = JSON.parse(array[i].map_array);
        }
        if (club.elevation_array && club.elevation_array !== null) {          
          array[i].elevation_array = JSON.parse(array[i].elevation_array);
        }
      }
    } else {
      this.generatePictureUrl(array);
    }
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

  joinClubAsMember(clubId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<Profile>(`${this.macLocal}${this.joinClubEndpoint}${clubId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  leaveClubAsMember(clubId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<Profile>(`${this.macLocal}${this.leaveClubEndpoint}${clubId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  attendClubEvent(eventId: string | number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<Profile>(`${this.macLocal}${this.attendClubEventEndpoint}${eventId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  leaveClubEvent(eventId: string | number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<Profile>(`${this.macLocal}${this.leaveClubEventEndpoint}${eventId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUserAccount(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete<Profile>(`${this.macLocal}${this.deleteUserEndpoint}${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  storeUser(user: User) {
    this.urlFormat(user);
    this.user = user;
    console.log('User Stored', this.user);
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
        this.getUserApi()
          .subscribe(
            res => {                            
              this.storeUser(res)
              resolve(this.user);
            })
        error => {          
          reject(error.message)
        }
      }
    })
  }

  refreshUser() {
    this.user = null;
    this.getUser();
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

  getUserClub(id: any): any {    
    if (this.user) {
      let details = null;      
      if (this.user.hasOwnProperty('cycling_club_admin') && this.user.cycling_club_admin.length > 0) {
        let adminArray = this.user.cycling_club_admin
        let adminSearch = adminArray.find(clubs => clubs.id == id)
        if (adminSearch) {
          details = {
            club: adminSearch,
            userGroup: 'admin'
          }
        }
      }
      if (this.user.hasOwnProperty('cycling_club_member') && this.user.cycling_club_member.length > 0) {
        let membersArray = this.user.cycling_club_member
        let memberSearch = membersArray.find(clubs => clubs.id == id)
        if (memberSearch) {
          details = {
            club: memberSearch,
            userGroup: 'member'
          }
        }
      }
      if (details) {
        return details;
      } else {
        return false;
      }
    } return Error('No User Stored');
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
    if (error.error.message === "Unauthenticated.") {
      window.localStorage.clear();      
      this.router.navigate['/login']
    }
    // localStorage.removeItem('token')
    // this.router.navigate['/login']
    // return an observable with a user-facing error message
    return throwError(error);
  };
}
