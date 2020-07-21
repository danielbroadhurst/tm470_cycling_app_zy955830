import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators/';
import { User } from '../classes/userClass';
import { Router } from '@angular/router';
import { Profile } from '../classes/profile';
import { CyclingClub } from '../classes/cyclingClub';

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
  deleteUserEndpoint = 'api/delete-account/';
  profileEndpoint = 'api/user-profile';
  joinClubEndpoint = 'api/join-cycling-club/';
  leaveClubEndpoint = 'api/leave-cycling-club/';

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
        map(result => {
          if (result) {
            if (result[0].user_profile !== null) {              
              let profilePictureCheck = result[0].user_profile ? result[0].user_profile : null;
              if (profilePictureCheck && profilePictureCheck.profile_picture) {
                let profileUrl = `${this.macLocal}${profilePictureCheck.profile_picture}`;
                result[0].user_profile.profile_picture = profileUrl;
              }
              let cyclingClubAdmin = result[0].cycling_club_admin;
              if (cyclingClubAdmin.length > 0) {
                for (let i = 0; i < cyclingClubAdmin.length; i++) {
                  const club = cyclingClubAdmin[i];
                  if (club.profile_picture) {
                    let profileUrl = `${this.macLocal}${club.profile_picture}`;
                    result[0].cycling_club_admin[i].profile_picture = profileUrl;
                  }
                }
              }
              let cyclingClubMember = result[0].cycling_club_member;
              if (cyclingClubMember.length > 0) {
                for (let i = 0; i < cyclingClubMember.length; i++) {
                  const club = cyclingClubMember[i];
                  if (club.profile_picture) {
                    let profileUrl = `${this.macLocal}${club.profile_picture}`;
                    result[0].cycling_club_member[i].profile_picture = profileUrl;
                  }
                }
              }
              console.log(result);
              
            }
          }
          return result;
        }),
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
          console.log(error);
          
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
    console.log(id, this.user, 'uS');
    
    if (this.user) {
      let details = null;
      console.log(this.user, 'user');
      console.log(this.user.cycling_club_admin);
      
      if (this.user.cycling_club_admin.length > 0) {
        let adminArray = this.user.cycling_club_admin
        let adminSearch = adminArray.find(clubs => clubs.id == id)
        if (adminSearch) {
          details = {
            club: adminSearch,
            userGroup: 'admin'
          }
        }
        console.log(details, 'adminCheck');
      }

      if (this.user.cycling_club_member.length > 0) {
        let membersArray = this.user.cycling_club_member
        let memberSearch = membersArray.find(clubs => clubs.id == id)
        if (memberSearch) {
          details = {
            club: memberSearch,
            userGroup: 'member'
          }
          console.log(details, 'memberCheck');
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
    localStorage.removeItem('token')
    this.router.navigate['/login']
    // return an observable with a user-facing error message
    return throwError(error);
  };
}
