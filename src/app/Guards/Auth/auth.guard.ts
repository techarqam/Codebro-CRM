import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    public navCtrl: NavController,
    public db: AngularFirestore,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {

          this.db.doc(`/Sellers/${user.uid}`).get().subscribe(snap => {
            if (snap.exists) {
              resolve(true);
            } else {
              this.authService.logout();
              this.commonService.presentToast("You are not a Seller");
              resolve(false)
            }
          })
        } else {
          this.navCtrl.navigateRoot(['/login']);
          // this.commonService.presentToast("You are not Logged in");
          resolve(false);
        }
      });
    });

  }
}