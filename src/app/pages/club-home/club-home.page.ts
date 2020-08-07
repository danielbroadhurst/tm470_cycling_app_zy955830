import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.page.html',
  styleUrls: ['./club-home.page.scss'],
})
export class ClubHomePage implements OnInit {

  userGroup: string;
  club: CyclingClub;

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() { }
  
  ionViewDidLeave() {
    this.userGroup = null;
    this.club = null;
  }

  setCyclingClub(club: CyclingClub) {
    this.club = club;
  }

}
