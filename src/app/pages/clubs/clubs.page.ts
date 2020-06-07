import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'src/app/services/loading.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage implements OnInit {

  constructor(
    public userService: UserService,
    public alertController: AlertController,
    public loading: Loading,
  ) { }

  ngOnInit() {
    this.loading.presentLoading("Loading Details", 300)    
  }
  
  async presentAlert(header: string, subHeader:string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
