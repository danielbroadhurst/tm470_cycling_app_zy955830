import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  response;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() { }

  menuItems = [
    { name: 'Dashboard', icon: 'home-outline', link: "/dashboard" },
    { name: 'Profile', icon: 'person-circle-outline', link: "/profile" },
    { name: 'Clubs', icon: 'bicycle-outline', link: "/clubs" },
  ]

  logout() {
    let token = localStorage.getItem('token');
    this.authService.logoutUser(token)
      .subscribe(
        res => {         
          this.userService.clearUser() 
          this.response = res;
          this.router.navigate(['/']);
          this.presentAlert('Success', this.response)
          localStorage.removeItem('token');
        })
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
