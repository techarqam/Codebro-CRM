import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';
import { MessagingService } from './Messaging/messaging.service';
import { CommonService } from './Common/common.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private fcm: FCM,
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    public messagingService: MessagingService,
    public commonService: CommonService,
    public db: AngularFirestore,
  ) {
    // const _messaging = firebase.messaging();
    // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  }


  getToken() {
    this.fcm.getToken().then(token => {
      console.log(token);
      let id = firebase.auth().currentUser.uid;
      this.messagingService.registerToken(token, id).then(() => {

        this.commonService.presentToast("Token Registered");
      })
    });
  }

  subscribeNotifications() {
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        this.commonService.presentToast('Received in background');
      } else {
        this.commonService.presentToast('Received in foreground');
      }
    });
  }

  showMessages(): Observable<any> {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.title;
        this.commonService.presentToast(body);
      })
    );
  }

}
