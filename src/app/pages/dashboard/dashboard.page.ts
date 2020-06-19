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
  seachQuery: string;

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
    let message = `Thank you for ${this.profile ? 'updating your profile.' : 'creating your profile.'}`;
    this.userService.storeUser(user);
    this.presentAlert('Success', 'Profile Stored', message)
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
      })
  }

  searchForLocation(event) {
    this.seachQuery = event.target.value;
    console.log(this.seachQuery);
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
