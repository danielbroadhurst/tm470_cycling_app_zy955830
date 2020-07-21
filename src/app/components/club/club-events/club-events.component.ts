import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { UserService } from 'src/app/services/user.service';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-club-events',
  templateUrl: './club-events.component.html',
  styleUrls: ['./club-events.component.scss'],
})
export class ClubEventsComponent implements OnInit {

  club: CyclingClub;
  userGroup: string;

  constructor(
    private clubService: ClubService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {  
    this.club = this.clubService.getCyclingClub();
    this.userGroup = this.clubService.getUserGroup();
    if (!this.userGroup) {
      this.router.navigate(['/clubs'])
    }
  }

  ionViewDidLeave() {
    this.club = null;
    this.userGroup = null;
  }
}
