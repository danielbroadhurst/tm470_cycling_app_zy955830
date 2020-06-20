import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/userClass';
import { ClubService } from 'src/app/services/club.service';
import { CyclingClubService } from 'src/app/services/cycling-club.service';
import { resolve } from 'url';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.page.html',
  styleUrls: ['./club-home.page.scss'],
})
export class ClubHomePage implements OnInit {

  club: CyclingClub
  user: User
  userGroup: string = 'guest';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private clubService: ClubService,
    private cyclingClubService: CyclingClubService
  ) { }

  ngOnInit() {
    this.showClub();
  }

  async showClub() {

    let clubID = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : false;
    console.log(clubID, this.route.snapshot.paramMap.get('id'), 'id');
    let clubCheck = this.userService.getUserClub(clubID);
    console.log(clubCheck, 'before');

    if (!clubCheck && clubID) {
      let clubSearch = await this.checkClubs(clubID);
      console.log(clubCheck, 'loop');
      clubCheck = {
        club: clubSearch[0],
        userGroup: 'guest'
      }
    }
    console.log(clubCheck, 'after');

    this.club = clubCheck.club;
    this.userGroup = clubCheck.userGroup;
    this.clubService.setCyclingClub(this.club);
    this.clubService.setUserGroup(clubCheck.userGroup);

    console.log(clubCheck, 'outside of loop');
  }

  checkClubs(id) {
    return new Promise((resolve, reject) => {
      this.cyclingClubService.viewCyclingClubs(null, id)
        .subscribe(result => {
          console.log(result, 'club');
          resolve(result)
        })
    })
  }
}
