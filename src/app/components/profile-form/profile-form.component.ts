import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  @Input() user: User;

  constructor(
    public platform: Platform,
    private camera: Camera) { }

  ngOnInit() {}

  genderSelected(event) {
    console.log(event.detail.value);
  }

  captureImage() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log(base64Image);
          
        }, (err) => {
          // Handle error
        });
      }
    });
  }

}
