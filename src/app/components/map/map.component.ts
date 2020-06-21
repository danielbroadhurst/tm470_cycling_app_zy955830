import { Component, OnInit, ViewChild, ElementRef, Input, Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/services/club.service';
import { ClubsHomeComponent } from '../clubs/clubs-home/clubs-home.component';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
@Directive({selector: '[clicked]'})
export class MapComponent implements OnInit {

  @HostListener('click', ['$event.target.id']) onClick(id: any) {
    console.log(this.parent, 'b4');
    this.parent.clearMap();
    console.log(this.parent, 'aft');
    
    console.log(`You clicked on ${id}`);
    this.clubService.setSelectedClub(id);
    this.router.navigate(['/club-home/'+id]); 
  } 

  @Input() location: any;
  @Input() markers: any;

  private platform: any;
  private behavior: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor(
    private parent: ClubsHomeComponent,
    private clubService: ClubService,
    private router: Router
  ) {
    this.platform = new H.service.Platform({
      "app_id": "S3uSkOhhM4WP9GITH6r9",
      "app_code": "9OkGtDOX_dwWCraOMu7x5Q"
    });
  }

  public ngOnInit() {
    console.log(this.markers, 'mapMarkers');

  }

  public ngAfterViewInit() {
    if (this.location) {
      this.displayMap();
    }
  }

  displayMap() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.location.coords.latitude, lng: this.location.coords.longitude }
      }
    );
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // create default UI with layers provided by the platform
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    this.addInfoBubble(map, ui);
  }


  // Here Maps Functions : 
  /**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
  addMarkerToGroup(group, coordinate, html) {
    var marker = new H.map.Marker(coordinate);
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
  }

  /**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
  addInfoBubble(map, ui) {
    var group = new H.map.Group();

    map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function (evt) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        // read custom data
        content: evt.target.getData()
      });
      // show info bubble
      ui.addBubble(bubble);
    }, false);

    this.markers.forEach(marker => {
      let htmlInfo = `<div class="marker">
                        <h3>${marker.name}</h3>
                        <p>${marker.style}</p>
                        <button clicked id="${marker.id}">Join Club</button>
                      </div>`
      this.addMarkerToGroup(group, { lat: marker.lat, lng: marker.lon }, htmlInfo);
    });

  }

}

