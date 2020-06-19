import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from "@angular/router"
import { AlertController } from '@ionic/angular';
import { UserAuth } from 'src/app/classes/user-auth';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  response: any;
  apiErrorResponse: string;

  model = new UserAuth(null, null, null, null);

  isValidEmail = false;
  isValidPassword = false;
  displayEmailError = false;
  displayPasswordError = false;

  userloader:any;
  constructor(
    private router: Router,
    public authentication: AuthenticationService,
    public userService: UserService,
    public alertController: AlertController,
    public loadingController: Loading) {
  }

  ionViewDidEnter() {
    if (this.authentication.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  ngOnInit() {      
  }

  loginUser(event: { preventDefault: () => void; }) {  
    event.preventDefault();    
    if (this.model.email) {
      this.isValidEmail = true;
      this.displayEmailError = false;
    }
    if (this.model.password) {
      this.isValidPassword = true;
      this.displayPasswordError = false;
    }
    if (this.isValidEmail && this.isValidPassword) {
      this.loadingController.presentLoading('Logging In');
      this.authentication.loginUser(this.model)
      .subscribe(
        res => {
          this.response = res;
          if (this.response.access_token) {
            this.loadingController.dismiss();
            localStorage.setItem('token', this.response.access_token);
            setTimeout(() => {
              this.model = new UserAuth(null, null, null, null);
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        },
        error => {
          if (typeof(error) === 'string') {
            this.apiErrorResponse = error;
          } else {
            this.apiErrorResponse = `${error.message} ${Object.values(error.errors) ? Object.values(error.errors).toString() : 'No More Info.'}`;
          }
          this.loadingController.dismiss();
          this.presentAlert('Error', 'Unsuccessful Login Attempt', this.apiErrorResponse)
        }     
      );
    } else {
      if (!this.isValidEmail) {
        this.displayEmailError = true;
      }
      if (!this.isValidPassword) {
        this.displayPasswordError = true;
      }
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
