import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

import { Router } from "@angular/router"
import { AlertController } from '@ionic/angular';
import { UserAuth } from 'src/app/interfaces/user-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  response: any;
  apiErrorResponse: string;
  model = new UserAuth(null, null, null, null);

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  createUser(event: { preventDefault: () => void; }) {    
    event.preventDefault(); 
    this.authentication.registerUser(this.model)
    .subscribe(
      res => {
        this.response = res;
        // TODO - Store the access_token
        if (this.response.access_token) {
          localStorage.setItem('token', this.response.access_token);
          this.model = new UserAuth(null, null, null, null);
          this.router.navigate(['/dashboard']);
        }
      }, // success path
      error => {
        this.apiErrorResponse = error
        this.presentAlert('Error', this.apiErrorResponse)
       } // error path      
    )
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
