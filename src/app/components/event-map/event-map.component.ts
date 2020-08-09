import { Component, AfterContentInit, Input } from '@angular/core';

declare var L: any;
@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss'],
})
export class EventMapComponent implements AfterContentInit {

  @Input() gpxArray: any;
  @Input() elevation: [] = [];
  @Input() showElevation: boolean = false;

  mymap: any = null;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {    
    if (this.gpxArray) {
      setTimeout(() => {
        this.displayMap();
      }, 300);
    }
    if (this.elevation) {
      setTimeout(() => {
        this.showElevation = true;
      }, 300);
    }
  }

  displayMap() {
    this.mymap = L.map('map_event').setView(this.gpxArray[0], 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGFuaWVsYnJvYWRodXJzdCIsImEiOiJjazlscTI2MmUwOXE4M21wZGM3bHJ2b2tqIn0.w1YRTD3Je5e4LhBw1S2z4Q'
    }).addTo(this.mymap);
    var polygon = L.polygon(this.gpxArray).addTo(this.mymap);
    this.mymap.fitBounds(polygon.getBounds());
  }

}
