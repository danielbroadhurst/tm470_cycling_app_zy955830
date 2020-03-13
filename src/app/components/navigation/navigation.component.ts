import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {}

  menuItems = [
    {name: 'Dashboard', icon: 'home-outline', link: "/dashboard"},
    {name: 'Profile', icon: 'person-circle-outline', link: "/profile"},
    {name: 'Clubs', icon: 'bicycle-outline', link: "/clubs"},
    {name: 'Logout', icon: 'log-out-outline', link: "/login"}
  ]
}
