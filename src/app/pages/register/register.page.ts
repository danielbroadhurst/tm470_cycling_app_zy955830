import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

import { Router } from "@angular/router"
import { AlertController } from '@ionic/angular';
import { UserAuth } from 'src/app/classes/user-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  apiErrorResponse: string;
  model = new UserAuth(null, null, null, null);

  constructor(
    public router: Router,
    public authentication: AuthenticationService,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  createUser(event: { preventDefault: () => void; }) {    
    event.preventDefault(); 
    this.authentication.registerUser(this.model)
    .subscribe(
      res => {        
        if (res.email ==  this.model.email) {
          this.presentAlert('Success', 'Successfully created Account, Please Login.')
          this.router.navigate(['/login'])          
          this.model = new UserAuth(null, null, null, null);
        } else {
          throw "Error creating user account. Please try again.";
        }
      },
      error => {
        this.apiErrorResponse = `${error.message} ${Object.values(error.errors) ? Object.values(error.errors).toString() : 'No more info.'}`;
        this.presentAlert('Error', this.apiErrorResponse)
       }   
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
