import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Loading } from 'src/app/services/loading.service';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {

  user: User;
  adminClubs: Array<CyclingClub> = [];
  searchQuery: string;
  memeberClubs: Array<CyclingClub> = [];

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading,
    private clubService: ClubService,
    private router: Router
  ) { }


  ngOnInit() { }

  ionViewWillEnter() {
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.cycling_club_admin) {
          this.showAdminClubs();
        }
      })
  }

  ionViewDidLeave() {    
    this.user = null;
    console.log(this.user, 'cleared');
    
  }

  async getUser() {
    this.user = await this.userService.getUser();
    
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
