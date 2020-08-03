import { Component, OnInit, Input } from '@angular/core';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {

  @Input() club: CyclingClub;

  constructor(
    private clubService: ClubService
  ) { }

  ngOnInit() { }

  storeClub(id: string) {
    this.clubService.setSelectedClub(id);
  }

}
