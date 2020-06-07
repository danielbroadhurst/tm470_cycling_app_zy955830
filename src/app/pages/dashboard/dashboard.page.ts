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

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading) {
  }

  response:any;
  apiErrorResponse: any;
  user: User;
  profile: boolean;

  ngOnInit() {
    this.profile = false;
    this.loading.presentLoading("Loading Details", 300)
    this.getLoggedUser()
  }

  async getLoggedUser() {    
    this.user = await this.userService.getLoggedUser();  
    if (this.user.user_profile) {
      this.profile = true;
    }
  }

  async presentAlert(header: string, subHeader:string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
