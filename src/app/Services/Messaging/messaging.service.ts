import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  userRef = this.db.collection(`Users`);
  messageRef = this.db.collection(`Messages`);

  constructor(
    public db: AngularFirestore,
  ) { }
  getUsers() {
    return this.userRef.snapshotChanges();
  }
  getSingleUser(userId) {
    return this.userRef.doc(userId).snapshotChanges();
  }
  sendMessage(message) {
    return this.messageRef.add(message);
  }
  getSentMessages(recieverId) {
    return this.db.collection(`Messages`, ref => ref.where("reciever", "==", recieverId).where("sender", "==", firebase.auth().currentUser.uid).orderBy('timestamp', 'asc')).snapshotChanges();
  }
  getRecivedMessages(recieverId) {
    return this.db.collection(`Messages`, ref => ref.where("sender", "==", recieverId).where("reciever", "==", firebase.auth().currentUser.uid).orderBy('timestamp', 'asc')).snapshotChanges();
  }
  registerToken(token, id) {
    return this.db.collection(`Users`).doc(id).update({ token: token });
  }
}
