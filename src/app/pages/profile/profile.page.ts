import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/userClass';
import { Loading } from 'src/app/services/loading.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading) {
   }

  ngOnInit() {
    this.getLoggedUser()
  }
  user: User;
  profile: boolean;
  response:any;
  apiErrorResponse: any;

  async getLoggedUser() {    
    this.user = await this.userService.getLoggedUser();  
    console.log(this.user);
    
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
