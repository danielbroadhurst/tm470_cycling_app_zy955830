import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { UserService } from 'src/app/services/user.service';
import { ClubService } from 'src/app/services/club.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClubEvent } from 'src/app/classes/club-event';
import { User } from 'src/app/classes/userClass';
import { ClubEventService } from 'src/app/services/club-event.service';
import { ClubHomePage } from 'src/app/pages/club-home/club-home.page';

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
  newEvents: ClubEvent[] = [];
  showEvents: boolean = true;

  displayEvent: number = null;
  setClub: number = null;
  setUserGroup: number = null;

  constructor(
    private route: Router,
    private userService: UserService,
    private clubService: ClubService,
    private eventService: ClubEventService,
    private router: Router,
    public alertController: AlertController,
  ) {
    let state = window.history.state;
    if (state.selectedEvent) {
      this.displayEvent = state.selectedEvent;
      this.setClub = state.cyclingClub;
      this.clubService.setUserGroup(state.userGroup);
    }
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.userService.getUser()
    .then(user => {
      this.user = user;
      if (this.setClub) {
        this.club = this.user.cycling_club_member.find(club => club.id === this.setClub)
        this.clubService.setCyclingClub(this.club);
      } else {
        this.club = this.clubService.getCyclingClub()
        this.userGroup = this.clubService.getUserGroup();
      }
    })
    .then(() => {
      this.loadClubData();
    })
  }

  loadClubData() {
    if (!this.userGroup) {
      this.router.navigate(['/clubs'])
    }
    if (this.club) {
      if (this.displayEvent) {
        this.viewEventInfo(this.displayEvent)
      } else {
        this.checkForNewEvents()
      }
    }
  }

  ionViewDidLeave() {
    this.club = null;
    this.userGroup = null;
    this.displayEvent = null;
    this.setClub = null;
    this.setUserGroup = null;
  }

  checkForNewEvents() {
    this.newEvents = [];
    if (this.club.events) {
      this.club.events.forEach(clubEvent => {
        if (!('event_attendee'! in this.user) || !this.user.event_attendee.find(event => event.id === clubEvent.id)) {
          this.newEvents.push(clubEvent)
        }
      });
    }
  }

  showEventForm($event) {
    this.showEvents = false;
    this.editEvent.push($event);
  }

  viewEventInfo(eventID) {
    console.log(eventID);

    this.eventService.viewClubEvents(eventID)
      .subscribe(result => {
        this.showEvents = false;
        this.viewEvent.push(result);
      })
  }

  eventUpdated($event) {
    if ($event) {
      this.showEvents = true;
      this.editEvent = [];
      this.ionViewDidEnter();
    }
  }

  backToEvents() {
    this.showEvents = true;
    this.viewEvent = [];
    this.displayEvent = null;
    this.setClub = null;
    this.setUserGroup = null;
    this.ionViewDidEnter();
  }

  joinEvent(id: number) {
    this.userService.attendClubEvent(id)
      .subscribe(result => {
        this.userService.storeUser(result);
        this.user = result;
        let event = this.user.event_attendee.find(event => event.id === id)
        this.viewEvent.push(event);
        this.presentAlert('Success', 'Joined Event', 'You can view all the latest updates about the event on the Event Page.')
      })
  }

  leaveEvent(id: string) {
    this.userService.leaveClubEvent(id)
      .subscribe(result => {
        this.userService.storeUser(result);
        this.user = result;
        this.backToEvents();
        this.presentAlert('Success', 'Left Event', 'You will no longer be an event attendee.')
      })
  }

  checkUser(id: number) {
    if (this.user.event_attendee && this.user.event_attendee.find(event => event.id === id)) {
      return true;
    } else {
      return false;
    }
  }

  convertDifficulty(difficulty: number): string {
    if (difficulty < 30) return "Easy";
    else if (difficulty < 60) return "Medium";
    else return "Hard";
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
