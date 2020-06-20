import { Component, OnInit } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.component.html',
  styleUrls: ['./club-home.component.scss'],
})
export class ClubHomeComponent implements OnInit {

  club: CyclingClub

  constructor(
    private clubService: ClubService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this, 'loaded');
    
    this.club = this.clubService.getCyclingClub(); 
    if (!this.club) {
      this.router.navigate(['/clubs']);
    }
    console.log(this.club);
  }

}
