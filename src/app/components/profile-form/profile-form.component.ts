import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Profile } from 'src/app/classes/profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  @Input() user: User;

  response: any;
  apiErrorResponse: string;

  imageFilePath:any;

  profile: Profile;

  constructor(
    private camera: Camera,
    public userService: UserService,
    public platform: Platform,
    public alertController: AlertController) { }


  ngOnInit() {
    if (this.user.user_profile) {
      this.profile = this.user.user_profile;
      this.imageFilePath = this.user.user_profile.profile_picture;
    } else {
      this.profile = new Profile(null, null, null, null, null, null, null, null, null)
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
          this.profile.profile_picture = this.imageFilePath;
        }, (err) => {
          // Handle error
        });
      }
    });
  }
  
  formatDateOfBirth(event: any) {
    let date = new Date(event.detail.value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    this.profile.date_of_birth = `${year}/${this.padDateString(month)}/${this.padDateString(day)}`;
  }

  padDateString(value:number) {
    return value.toString().padStart(2, "0");
  }

  
  genderSelected(event: any) {
    this.profile.gender = event.detail.value;
  }

  submitProfile() {
    this.userService.createProfile(this.profile)
    .subscribe(
      res => {
        this.response = res;
        this.userService.storeUser(res[0])
        console.log(this.response);
      }, // success path
      error => {
        this.apiErrorResponse = error
        this.presentAlert('Error', this.apiErrorResponse)
       } // error path      
    )
    console.log(this.profile);
    
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