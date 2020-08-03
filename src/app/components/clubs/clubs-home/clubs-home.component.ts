import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/userClass';
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/services/loading.service';
import { HereMapsService } from 'src/app/services/here-maps.service';
import { CyclingClubService } from 'src/app/services/cycling-club.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-clubs-home',
  templateUrl: './clubs-home.component.html',
  styleUrls: ['./clubs-home.component.scss'],
})
export class ClubsHomeComponent implements OnInit {

  user: User;
  profile: boolean;
  location: object;
  localClubs: boolean;
  cyclingClubs: CyclingClub[] = [];
  clubMarkers: Array<any>[any] = [];
  clubSearchResults: CyclingClub[] = [];

  club: CyclingClub

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController,
    private loading: Loading,
    private hereService: HereMapsService,
    private clubsService: CyclingClubService,
    private geolocation: Geolocation,
    ) { }
  
  ngOnInit() {     
    if (this.route.snapshot.queryParams.message) {
      this.presentAlert('Error', 'Access Denied', this.route.snapshot.queryParams.message)
    }  
  }

  ionViewDidEnter() {
    this.profile = false;    
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (this.user.user_profile) this.profile = true;
        this.club = this.user.cycling_club_admin[0]
      })
  }

  ionViewDidLeave() {
    this.user = null;
    this.clearMap()
  }

  clearMap() {
    this.localClubs = false;
    this.location = null;
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
      .catch(error => {
        
      })
  }

  findClubs() {
    this.clubSearchResults = [];
    this.clubMarkers = [];
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = resp;   
      this.hereService.getRelatedAreas(this.location)
      .subscribe(results => {
        this.displayClubs(results.County)
      })
     }).catch((error) => {
       this.presentAlert('Error', 'Error getting location', error);
     });
  
    // window.navigator.geolocation.getCurrentPosition(resp => {
    //   this.location = resp;
    //   this.localClubs = true;
    // });
  }

  displayClubs(county: string) {
    this.clubsService.viewCyclingClubs(county)
    .subscribe(results => {
      this.cyclingClubs = results;
      if (this.cyclingClubs.length > 0) {
        this.cyclingClubs.forEach(club => {
          let mapMarker = {
            id: club.id,
            name: club.club_name,
            style: club.preferred_style,
            lat: club.lat,
            lon: club.lng
          }        
          this.clubMarkers.push(mapMarker);
        });
      } else {
        this.presentAlert('Alert', 'No clubs found.', "There doesn't seem to be any clubs in the area which you have searched.")
      }
    })
  }

  showClubDistances(clubDistance) {
    let cyclingClub = this.cyclingClubs.find(club => club.id === clubDistance.id);
    if (cyclingClub) {
      cyclingClub.distanceToUser = (clubDistance.distance / 1000).toFixed(2);
    }
    this.clubSearchResults.push(cyclingClub);
    this.sortArray(this.clubSearchResults);
  }

  private sortArray(array) {
    array.sort(function(a, b) {
      return a.distanceToUser - b.distanceToUser;
    });
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
