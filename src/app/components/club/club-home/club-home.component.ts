import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.component.html',
  styleUrls: ['./club-home.component.scss'],
})
export class ClubHomeComponent implements OnInit {

  club: CyclingClub

  constructor(
    private clubService: ClubService
  ) { }

  ngOnInit() {
    this.club = this.clubService.getCyclingClub(); 
    console.log(this.club);
  }

}
