import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { UserService } from 'src/app/services/user.service';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClubEvent } from 'src/app/classes/club-event';
import { User } from 'src/app/classes/userClass';

@Component({
  selector: 'app-club-events',
  templateUrl: './club-events.component.html',
  styleUrls: ['./club-events.component.scss'],
})
export class ClubEventsComponent implements OnInit {

  user: User;
  club: CyclingClub;
  userGroup: string;
  editEvent: ClubEvent[] = [];
  viewEvent: ClubEvent[] = [];
  showEvents: boolean = true;

  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userService.getUser()
      .then(user => {
        this.user = user;
        this.club = this.clubService.getCyclingClub();
        this.userGroup = this.clubService.getUserGroup();
        if (!this.userGroup) {
          this.router.navigate(['/clubs'])
        }
      });
  }

  ionViewDidLeave() {
    this.club = null;
    this.userGroup = null;
  }

  showEventForm($event) {
    this.showEvents = false;
    this.editEvent.push($event);
  }

  viewEventInfo($event) {
    this.showEvents = false;
    this.viewEvent.push($event);
  }

  eventUpdated($event) {
    if ($event) {
      this.showEvents = true;
      this.editEvent = [];      
      this.ionViewWillEnter();
    }
  }

  backToEvents() {
    this.showEvents = true;
    this.viewEvent = [];      
    this.ionViewWillEnter();
  }

  convertDifficulty(difficulty: number): string {    
    if (difficulty < 30) return "Easy";
    else if (difficulty < 60) return "Medium";
    else return "Hard";
  }
}
