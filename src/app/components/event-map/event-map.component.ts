import { Component, AfterContentInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ClubsHomeComponent } from '../clubs/clubs-home/clubs-home.component';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';

declare var L: any;

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss'],
})
export class EventMapComponent implements AfterContentInit {

  @HostListener('click', ['$event.target.id']) onClick(id: any) {
    console.log(id, typeof(id));
    if (id !== "") {
      this.parent.clearMap();
      this.clubService.setSelectedClub(id);
      this.router.navigate(['/club-home/'+id]); 
    }
  } 

  @Input() location: any;
  @Input() markers: any;

  @Output() mapDistance = new EventEmitter();

  mymap: any;
  userMarker: any;

  constructor(
    private parent: ClubsHomeComponent,
    private clubService: ClubService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    if (this.location) {
      this.displayMap();
    }
  }

  displayMap() {
    this.mymap = L.map('map_canvas').setView([this.location.coords.latitude, this.location.coords.longitude], 10);
    this.userMarker = L.marker([this.location.coords.latitude, this.location.coords.longitude]);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGFuaWVsYnJvYWRodXJzdCIsImEiOiJjazlscTI2MmUwOXE4M21wZGM3bHJ2b2tqIn0.w1YRTD3Je5e4LhBw1S2z4Q'
    }).addTo(this.mymap);
    if (this.markers.length > 0) {
      this.addMarkers()
    }
  }

  addMarkers() {
    this.markers.forEach(marker => {
      let mapMarker = L.marker([marker.lat, marker.lon]).addTo(this.mymap);      
      let distanceToUser = this.userMarker.getLatLng().distanceTo(mapMarker.getLatLng()).toFixed(0)/1000
      marker.distanceToUser = distanceToUser;
      mapMarker.bindPopup(`<div class="marker">
                            <h3>${marker.name}</h3>
                            <p>Cycling Preference: ${marker.style}</p>
                            <button clicked id="${marker.id}">Join Club</button>
                          </div>`);

    });
    this.mapDistance.emit(this.markers);
    
  }
}
