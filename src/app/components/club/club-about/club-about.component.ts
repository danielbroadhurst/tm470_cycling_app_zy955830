import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/club.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { CyclingClub } from 'src/app/classes/cyclingClub';

@Component({
  selector: 'app-club-about',
  templateUrl: './club-about.component.html',
  styleUrls: ['./club-about.component.scss'],
})
export class ClubAboutComponent implements OnInit {

  club: CyclingClub;
  userGroup: string;

  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {  
    this.club = this.clubService.getCyclingClub();
    this.userGroup = this.clubService.getUserGroup();
    if (!this.userGroup) {
      this.router.navigate(['/clubs'])
    }
  }

  ionViewDidLeave() {
    this.club = null;
    this.userGroup = null;
  }

  leaveClub() {
    this.userService.leaveClubAsMember(this.clubService.getSelectedClub())
    .subscribe(() => {
      this.userService.refreshUser();
      this.presentAlert('Success', 'Left Club', 'You will now be redirected back to your clubs.')
    })
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/clubs/your-clubs'])
          }
        }
      ]
    });

    await alert.present();
  }

}
