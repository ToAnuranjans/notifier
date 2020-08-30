import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: FirebaseX, private platform: Platform) { }

  private getFirebaseToken() {
    return this.firebase.getToken();
  }

  private getAPNSToken() {
    return this.firebase.getAPNSToken();
  }

  requestPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const permission = await this.firebase.hasPermission();
        if (!permission) {
          const { hasPermission } = await this.firebase.grantPermission();
          if (hasPermission) {
            resolve(hasPermission);
          } else {
            reject(hasPermission);
          }
        } else {
          resolve(permission);
        }
      } catch (error) {
        reject(false);
      }
    });
  }

  async getToken() {
    if (this.platform.is('ios')) {
      return await this.getAPNSToken();
    }
    if (this.platform.is('android')) {
      return await this.getFirebaseToken();
    }
    return null;
  }

  onNotificationReceived() {
    return this.firebase.onMessageReceived();
  }


}
