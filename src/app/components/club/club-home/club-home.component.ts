import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CyclingClubService } from 'src/app/services/cycling-club.service';
import { ClubHomePage } from 'src/app/pages/club-home/club-home.page';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.component.html',
  styleUrls: ['./club-home.component.scss'],
})
export class ClubHomeComponent implements OnInit {

  club: CyclingClub = null;
  userGroup: string;

  constructor(
    private parent: ClubHomePage,
    private clubService: ClubService,
    private router: Router,
    private userService: UserService,
    private cyclingClubService: CyclingClubService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {    
    this.showClub();
  }

  ionViewDidLeave() {
    this.club = null; 
    this.userGroup = null;
  }

  async showClub() {    
    let clubID = this.clubService.getSelectedClub();    
    let clubCheck = this.userService.getUserClub(clubID);

    if (clubCheck.message == 'No User Stored') {
      return this.router.navigate(['/clubs']);
    }

    if (!clubCheck && clubID) {
      let clubSearch = await this.checkClubs(clubID);
      clubCheck = {
        club: clubSearch[0],
        userGroup: 'guest'
      }
    }
    
    this.clubService.setCyclingClub(clubCheck.club);
    this.clubService.setUserGroup(clubCheck.userGroup);
    this.club = this.clubService.getCyclingClub();
    this.userGroup = this.clubService.getUserGroup();
    this.parent.club = this.clubService.getCyclingClub();
    this.parent.userGroup = this.clubService.getUserGroup(); 
  }

  joinClub(id: string) {
    this.userService.joinClubAsMember(id)
    .subscribe(result => {
      this.userService.storeUser(result);
      this.showClub();
    })
  }

  checkClubs(id: string) {
    return new Promise((resolve, reject) => {
      this.cyclingClubService.viewCyclingClubs(null, id)
        .subscribe(result => {
          resolve(result)
        })
    })
  }

}
