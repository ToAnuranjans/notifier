import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseService } from './services/firebase.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebase: FirebaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      try {
        this.firebase.onNotificationReceived().subscribe(response => {
          if (response && response.url) {
            window.open(response.url);
          }
        });

        await this.firebase.requestPermission();
        const token = await this.firebase.getToken();
        console.log(token);

        // Token captured here can be sent to your custom-server for registration

      } catch (error) {
        console.log(error);
      }



      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
