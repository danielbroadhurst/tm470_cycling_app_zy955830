import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/userClass';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.page.html',
  styleUrls: ['./club-home.page.scss'],
})
export class ClubHomePage implements OnInit {

  club: CyclingClub
  user: User

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private clubService: ClubService
  ) { }

  ngOnInit() {      
    this.getLoggedUser()  
  }

  async getLoggedUser() {    
    this.user = await this.userService.getLoggedUser();
    this.showClub();
  }

  showClub() {    
    let id = this.route.snapshot.paramMap.get('id');
    this.club = this.userService.getUserClubAdmin(id); 
    this.clubService.setCyclingClub(this.club);
    if (!this.club) {
      this.router.navigate(['/clubs']); 
    }
  }
}
