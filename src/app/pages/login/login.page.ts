import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from "@angular/router"
import { AlertController } from '@ionic/angular';
import { UserAuth } from 'src/app/interfaces/user-auth';

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

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
    public alertController: AlertController) {
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
      this.authentication.loginUser(this.model)
      .subscribe(
        res => {
          this.response = res;
          if (this.response.access_token) {
            localStorage.setItem('token', this.response.access_token);
            this.model = new UserAuth(null, null, null, null);
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          this.apiErrorResponse = error
          this.presentAlert('Error', this.apiErrorResponse)
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
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
