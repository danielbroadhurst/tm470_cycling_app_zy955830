import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clubs-home',
  templateUrl: './clubs-home.component.html',
  styleUrls: ['./clubs-home.component.scss'],
})
export class ClubsHomeComponent implements OnInit {

  searchQuery: string;

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.message) {
      this.presentAlert('Error', 'Access Denied', this.route.snapshot.queryParams.message)
    }    
  }

  searchForClubs(event: any) {
    // Search DB of Clubs by Name and Location
    console.log(event.target.value);
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
