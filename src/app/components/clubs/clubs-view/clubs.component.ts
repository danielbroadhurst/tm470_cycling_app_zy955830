import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Loading } from 'src/app/services/loading.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {

  user: User;
  adminClubs: Array<CyclingClub> = [];
  memberClubs: Array<CyclingClub> = [];

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading,
    private clubService: ClubService,
  ) { }


  ngOnInit() { }

  ionViewWillEnter() {
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.cycling_club_admin) {
          this.showAdminClubs();
        }
        if (this.user.cycling_club_member) {
          this.showMemberClubs();
        }
      })
  }

  ionViewDidLeave() {
    this.user = null;
  }

  showAdminClubs() {
    if (this.adminClubs.length !== this.user.cycling_club_admin.length) {
      this.adminClubs.length = 0;
      let clubs = this.user.cycling_club_admin;
      clubs.forEach(club => {
        this.adminClubs.push(club);
      });
      console.log(this.adminClubs);
      
    }
  }

  showMemberClubs() {
    if (this.memberClubs.length !== this.user.cycling_club_member.length) {
      this.memberClubs.length = 0;
      let clubs = this.user.cycling_club_member;      
      clubs.forEach(club => {
        this.memberClubs.push(club);
      });
    }
  }

  storeClub(id: string) {
    this.clubService.setSelectedClub(id);
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
