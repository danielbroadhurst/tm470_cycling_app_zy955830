import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/userClass';
import { Loading } from 'src/app/services/loading.service';
import { AlertController } from '@ionic/angular';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  profile: boolean;

  constructor(
    public userService: UserService,
    public clubService: ClubService,
    public router: Router,
    public alertController: AlertController,
    public loading: Loading) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.profile = false;
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
      })
  }

  ionViewDidLeave() {
    this.user = null;
  }

  userProfileUpdated(user: User) {
    this.userService.storeUser(user);
    this.presentAlert('Success', 'Profile Updated', 'Thank you for updating your profile.')
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
      })
  }

  deleteUserAccount() {
    this.checkBeforeDelete();
  }

  deleteConfirmed() {
    this.userService.deleteUserAccount(this.user.id)
      .subscribe(result => {
        if (result.message) {
          this.userService.clearUser();
          this.clubService.clearCyclingClub()
          this.userService.clearUser()
          this.router.navigate(['/']);
          this.presentAlert('Success', 'Deleted Account', result.message)
          localStorage.removeItem('token');
        }
      })
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

  async checkBeforeDelete() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      subHeader: 'Are you sure?',
      message: 'This will remove your account and any clubs which you are currently an Admin for.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete Account',
          handler: () => {
            this.deleteConfirmed()
          }
        }
      ]
    });
    await alert.present();
  }
}
