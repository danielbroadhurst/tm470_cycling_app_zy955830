import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';
import { AlertController } from '@ionic/angular';
import { CyclingClubService } from 'src/app/services/cycling-club.service';
import { Router } from '@angular/router';
import { ClubHomePage } from 'src/app/pages/club-home/club-home.page';

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.component.html',
  styleUrls: ['./club-admin.component.scss'],
})
export class ClubAdminComponent implements OnInit {

  editProfile: boolean;
  createEvent: boolean;
  activeForm: boolean = false;
  club: CyclingClub;
  user: User;
  userGroup: string;

  constructor(
    private parent: ClubHomePage,
    private userService: UserService,
    private clubService: ClubService,
    private cyclingClubService: CyclingClubService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {  
    this.showClub();
    this.getUser();
  }

  ionViewDidLeave() {
    this.club = null; 
    this.userGroup = null;
  }

  async showClub() {    
    let clubID = this.clubService.getSelectedClub();    
    let clubCheck = this.userService.getUserClub(clubID);

    if (clubCheck.message == 'No User Stored' || !clubCheck) {
      return this.router.navigate(['/clubs']);
    }
    
    this.clubService.setCyclingClub(clubCheck.club);
    this.clubService.setUserGroup(clubCheck.userGroup);
    this.club = this.clubService.getCyclingClub();
    this.userGroup = this.clubService.getUserGroup();
    this.parent.club = this.clubService.getCyclingClub();
    this.parent.userGroup = this.clubService.getUserGroup();     
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

  showEditProfile() {
    this.editProfile = true;
    this.activeForm = true;
  }

  showCreateEvent() {
    this.createEvent = true;
    this.activeForm = true;
  }

  backToAdmin() {
    this.editProfile = false;
    this.createEvent = false;
    this.activeForm = false;
  }

  async deleteClub() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Delete Cycling Club',
      message: 'Are you sure you wish to delete ' + this.club.club_name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: () => {
            this.cyclingClubService.deleteCyclingClub(this.club)
            .subscribe(
              res => {                
                this.userService.storeUser(res[0]);
                this.presentAlert('Success', 'Deleted Club: ' + this.club.club_name)
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  async getUser() {    
    this.user = await this.userService.getUser();
  }

  updateSuccess(value: boolean) {
    this.editProfile = !value; 
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/clubs/home'])
          }
        }
      ]
    });

    await alert.present();
  }
}
