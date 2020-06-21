import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/services/club.service';
import { CyclingClubService } from 'src/app/services/cycling-club.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  searchQuery: string = "";
  textSearchResults: any[] = []
  noResults: boolean;
  target: any;

  constructor(
    private router: Router,
    private clubService: ClubService,
    private clubsService: CyclingClubService,
  ) { }

  ngOnInit() {}

  searchForLocation(event) {
    this.searchQuery = event.target.value;
  }

  searchForClubs(event: any) {
    this.searchText(event);
  }

  searchText(event) {    
    this.noResults = false;
    this.searchQuery = event.target.value;
    this.target = event.target;
    if (this.searchQuery.length >= 3) {
      this.clubsService.viewCyclingClubs(null, null, this.searchQuery)
      .subscribe(results => {
        this.textSearchResults = results;
        if (this.textSearchResults.length === 0) {
          this.noResults = true;
        }
        console.log(this.textSearchResults);
      })
    } else {
      this.textSearchResults = [];
    }
  }

  storeClub(id: string) {    
    this.clubService.setSelectedClub(id);
    this.router.navigate(['/club-home/'+id]);
    this.target.value = "";
    this.textSearchResults = [];
  }

  cancelSearch() {
    console.log('triggered');
  }

}
