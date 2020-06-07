import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Loading } from 'src/app/services/loading.service';
import { ClubService } from 'src/app/services/club.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {

  user: User;
  adminClubs: Array<CyclingClub> = [];
  navStart: Observable<NavigationStart>;
  searchQuery: string;
  memeberClubs: Array<CyclingClub> = [];

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading,
    private clubService: ClubService,
    private router: Router
  ) {
    this.getLoggedUser();
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }


  ngOnInit() {
    this.navStart.subscribe(evt => {
      this.getLoggedUser();
    });
    this.loading.presentLoading("Loading Details", 300);
  }

  async getLoggedUser() {
    this.user = await this.userService.getLoggedUser();
    if (this.user.cycling_club_admin) {
      this.showAdminClubs();
    }
  }

  showAdminClubs() {
    if (this.adminClubs.length !== this.user.cycling_club_admin.length) {
      this.adminClubs.length = 0;
      let clubs = this.user.cycling_club_admin;
      clubs.forEach(club => {
        this.adminClubs.push(club);
      });
    }
  }

  storeClub(club: CyclingClub) {
    this.clubService.setCyclingClub(club);
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
