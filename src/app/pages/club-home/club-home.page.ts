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
    private router: Router,
    private userService: UserService,
    private clubService: ClubService,
    private cyclingClubService: CyclingClubService
  ) { }

  ngOnInit() {  }

  ionViewWillEnter() {
    this.showClub();
  }

  ionViewDidLeave() {
    console.log('left');
    
  }

  async showClub() {
    let clubID = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : false;
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

    this.club = clubCheck.club;
    this.userGroup = clubCheck.userGroup;
    this.clubService.setCyclingClub(this.club);
    this.clubService.setUserGroup(clubCheck.userGroup);

    if (this.userGroup === 'admin' || this.userGroup === 'member') {
      return this.router.navigate(['/club-home/'+clubID+'/home']);
    }
  }

  checkClubs(id: string) {
    return new Promise((resolve, reject) => {
      this.cyclingClubService.viewCyclingClubs(null, id)
        .subscribe(result => {
          console.log(result, 'club');
          resolve(result)
        })
    })
  }
}
