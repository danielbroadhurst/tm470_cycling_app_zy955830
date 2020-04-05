import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/User';
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
    this.getLoggedUser()
    this.loading.presentLoading("Loading Details", null)
  }

  async getLoggedUser() {    
    let token = localStorage.getItem('token')
    console.log(token);
    
    this.user = await this.userService.getLoggedUser() ? this.userService.getLoggedUser() : this.alreadyLoggedIn(token);  
    this.profilePopulated(this.user.user_profile) 
    if (this.userService.getLoggedUser()) this.loading.dismiss()
  }

  async alreadyLoggedIn(accessToken:string) {    
    this.userService.initUser(accessToken)
    .subscribe(
      res => {      
        this.loading.dismiss()
        this.userService.storeUser(res[0]) 
        this.user = this.userService.getLoggedUser()    
        console.log(this.user);
        if (this.user.user_profile !== null) {
          this.profilePopulated(true)
        } else {
          this.profilePopulated(false)
        }
      },
      error => {
        this.apiErrorResponse = error.message
        this.presentAlert('Error', error.status, this.apiErrorResponse)
      }     
    );
  }

  profilePopulated(profile: any) {
    if (!this.user.user_profile) {
      this.profile = false;
    } else if (this.user.user_profile === null) {
      this.profile = false;
    } else {
      this.profile = true;
    }
    console.log(this.profile);
    
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
