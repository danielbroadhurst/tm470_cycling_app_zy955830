import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  constructor(public loadingController: LoadingController) {}

  async presentLoading(message:string, duration: null) {
    const loading = await this.loadingController.create({
      message: message,
      duration: duration
    });
    await loading.present();
  }

  async dismiss() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 300);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}