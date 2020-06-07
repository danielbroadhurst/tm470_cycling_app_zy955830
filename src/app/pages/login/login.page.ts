import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from "@angular/router"
import { AlertController } from '@ionic/angular';
import { UserAuth } from 'src/app/classes/user-auth';
import { UserService } from 'src/app/services/user.service';

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
    public alertController: AlertController) {
  }
  
  async ngOnInit() {  
    // Enables Auto Login and Stores User Data in UserService  
    if (this.authentication.loggedIn()) {
      this.alreadyLoggedIn()
    }
  }

  alreadyLoggedIn() {
    this.userService.getUser()
    .subscribe(
      res => {
        this.response = res;
        this.userService.storeUser(this.response[0])  
        this.router.navigate(['/dashboard']); // navigating to LoginComponent      
      },
      error => {
        this.apiErrorResponse = error.message
        this.presentAlert('Error', error.status, this.apiErrorResponse)
      }     
    );
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
            setTimeout(() => {
              this.model = new UserAuth(null, null, null, null);
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        },
        error => {
          console.log(error);
          this.apiErrorResponse = error.message
          this.presentAlert('Error', error.status, this.apiErrorResponse)
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
