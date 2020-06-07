import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/userClass';
import { AlertController } from '@ionic/angular';
import { Loading } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  profile: boolean;

  constructor(
    public userService: UserService,
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
    this.user = user;
    if (this.user.user_profile) {
      this.profile = true;
      this.presentAlert('Success', 'Profile Created', 'Thank you for creating your profile.')
    }
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
