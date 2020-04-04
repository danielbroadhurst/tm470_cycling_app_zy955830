import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  response;
  constructor(private authService: AuthenticationService, private menu: MenuController, private router: Router) { }

  ngOnInit() {}

  menuItems = [
    {name: 'Dashboard', icon: 'home-outline', link: "/dashboard"},
    {name: 'Profile', icon: 'person-circle-outline', link: "/profile"},
    {name: 'Clubs', icon: 'bicycle-outline', link: "/clubs"},
  ]

  logout() {
    localStorage.removeItem('token');
    this.authService.logoutUser().subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        
      })
    this.router.navigate(['/']);
  }
}
