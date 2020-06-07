import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';
import { AlertController } from '@ionic/angular';
import { CyclingClubService } from 'src/app/services/cycling-club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.component.html',
  styleUrls: ['./club-admin.component.scss'],
})
export class ClubAdminComponent implements OnInit {

  editProfile: boolean;
  club: CyclingClub;
  user: User;

  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private cyclingClubService: CyclingClubService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {  
    this.club = this.clubService.getCyclingClub();     
    this.getLoggedUser();
  }

  showEditProfile() {
    this.editProfile = true;
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

  async getLoggedUser() {    
    this.user = await this.userService.getLoggedUser();
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
