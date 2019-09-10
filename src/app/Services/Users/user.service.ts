import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  signIn = new FormGroup({
    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    pass: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
  });


  user = new FormGroup({
    name: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    pass: new FormControl(this.createPassword(), Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    status: new FormControl("Unverified", Validators.compose([
      Validators.required,
    ])),
    isAdmin: new FormControl(false, Validators.compose([
      Validators.required,
    ])),
    addedBy: new FormControl(""),
    timestamp: new FormControl(moment().format(), Validators.compose([
      Validators.required,
    ])),
  });


  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {
  }

  getUser(id) {
    return this.db.collection("Users").doc(id).snapshotChanges();
  }





  //Add User Functions


  addUser(nUser) {
    let user: any;
    this.db.collection("Users").doc(firebase.auth().currentUser.uid).snapshotChanges().subscribe(snap => {
      user = snap.payload.data();
      this.fireAuth.auth.createUserWithEmailAndPassword(nUser.email, nUser.pass).then(res => {
        this.db.collection(`Users`).doc(`${res.user.uid}`).set(nUser).then(() => {
          this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
            this.sendMailPassword(nUser);
          });
        });
      });
      console.log("nUser", nUser)
      console.log("cUser", user);
    });

    // return this.db.collection("UsersTemp").add(nUser);
  }

  sendMailPassword(user) {
    console.log(user)
  }


  createPassword() {
    let length = 16;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal: string = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

}
