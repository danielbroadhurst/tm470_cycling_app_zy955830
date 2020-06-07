import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClubAdmin implements CanActivate {
  constructor(
    public userService: UserService,
    private router: Router
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
  ) {
    let clubId = parseInt(next.parent.paramMap.get('id'));
    let user = await this.userService.getUser();    
    let clubCheck = user.cycling_club_admin.find(club => club.id == clubId);
    console.log(clubId, user, clubCheck, 'cAs');
    if (clubCheck) {
      return true;
    } else {
      this.router.navigate(['/clubs/home'], {queryParams: {message: 'You are not the Admin for that Club.'}})
      return false;
    }
  }
}