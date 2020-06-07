import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/userClass';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service'
import { CountriesService } from "src/app/services/countries.service";
import { CyclingClub } from 'src/app/classes/cyclingClub';
import { CyclingClubService } from 'src/app/services/cycling-club.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss'],
})
export class ClubFormComponent implements OnInit {
  @Input() user: User;
  @Input() edit: boolean;
  @Input() club: CyclingClub;

  @Output() updated = new EventEmitter<any>();

  response: any;
  apiErrorResponse: string;
  imageFilePath:any;
  cyclingClub: CyclingClub;
  countries: any;

  constructor(
    private camera: Camera,
    public userService: UserService,
    public countriesService: CountriesService,
    public cyclingClubService: CyclingClubService,
    public clubService: ClubService,
    public platform: Platform,
    public alertController: AlertController) { }


  async ngOnInit() {        
    this.countries = await this.countriesService.getCountries()
    if (this.user) {
      if (this.edit) {        
        this.cyclingClub = this.clubService.getCyclingClub();        
      } else {
        this.cyclingClub = new CyclingClub(null, null, null, null, null, null, null, null)
      }
    }
  }

  captureImage() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        const options: CameraOptions = {
          quality: 40,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true //Corrects Android orientation quirks
        }
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.imageFilePath = base64Image;
          this.cyclingClub.profile_picture = this.imageFilePath;
        }, (err) => {
          // Handle error
        });
      }
    });
  }

  createClub() {
    this.cyclingClubService.createCyclingClub(this.cyclingClub)
    .subscribe(
      res => {
        this.userService.storeUser(res[0]);
        this.presentAlert('Success', 'Created Club ' + this.cyclingClub.club_name)
      }
    )
  }

  updateClub() {
    this.cyclingClubService.updateCyclingClub(this.cyclingClub)
    .subscribe(
      res => {
        this.userService.storeUser(res[0]);
        this.updated.emit(true);
        this.presentAlert('Success', 'Updated Club: ' + this.cyclingClub.club_name)
      }
    )
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
