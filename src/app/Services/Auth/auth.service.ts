import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { tap } from 'rxjs/operators';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {







  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public commonService: CommonService,
  ) {
  }


  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  loginM(data) {
    return this.fireAuth.auth.signInWithEmailAndPassword(data.email, data.pass)
  }




  logout() {
    return this.fireAuth.auth.signOut();
  }

  getProfile() {
    return this.firestore.doc(`Users/${firebase.auth().currentUser.uid}`).snapshotChanges();
  }
}
