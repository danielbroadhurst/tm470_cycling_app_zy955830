import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/userClass';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/services/loading.service';
import { HereMapsService } from 'src/app/services/here-maps.service';
import { CyclingClubService } from 'src/app/services/cycling-club.service';

@Component({
  selector: 'app-clubs-home',
  templateUrl: './clubs-home.component.html',
  styleUrls: ['./clubs-home.component.scss'],
})
export class ClubsHomeComponent implements OnInit {

  searchQuery: string;
  user: User;
  profile: boolean;
  seachQuery: string;
  location: object;
  localClubs: boolean;
  cyclingClubs: CyclingClub[] = [];
  clubMarkers: Array<any>[any] = [];

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading,
    public hereService: HereMapsService,
    public clubsService: CyclingClubService) { }

  ngOnInit() { 
    if (this.route.snapshot.queryParams.message) {
      this.presentAlert('Error', 'Access Denied', this.route.snapshot.queryParams.message)
    }  
  }

  ionViewWillEnter() {
    this.profile = false;    
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
      })
  }

  ionViewDidLeave() {
    this.user = null;
    this.location = null;
    this.localClubs = false;
    this.cyclingClubs = [];
    this.clubMarkers = [];
  }

  userProfileUpdated(user: User) {   
    let message = `Thank you for ${this.profile ? 'updating your profile.' : 'creating your profile.'}`;
    this.userService.storeUser(user);
    this.presentAlert('Success', 'Profile Stored', message)
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
      })
  }

  findClubs() {
    window.navigator.geolocation.getCurrentPosition(resp => {
      this.location = resp;
      console.log(this.location);
      this.hereService.getRelatedAreas(this.location)
      .subscribe(results => {
        console.log(results, 'maps');
        this.displayClubs(results.County)
      })
      this.localClubs = true;
    });
  }

  displayClubs(county: string) {
    this.clubsService.viewCyclingClubs(county)
    .subscribe(results => {
      console.log(results, 'clubs');
      this.cyclingClubs = results;
      this.cyclingClubs.forEach(club => {
        console.log(club, 'cl');
        let mapMarker = {
          id: club.id,
          name: club.club_name,
          style: club.preferred_style,
          lat: club.lat,
          lon: club.lng
        }        
        this.clubMarkers.push(mapMarker);
      });
    })
  }

  searchForLocation(event) {
    this.seachQuery = event.target.value;
    console.log(this.seachQuery);
  }

  searchForClubs(event: any) {
    // Search DB of Clubs by Name and Location
    console.log(event.target.value);
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
