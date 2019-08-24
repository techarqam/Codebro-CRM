import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  dbRef = this.db.collection(`Files`, ref => ref.orderBy('timestamp', 'desc'));

  constructor(
    public db: AngularFirestore,
  ) { }
  addFile(file) {
    return this.dbRef.add(file);
  }
  getFiles() {
    return this.dbRef.snapshotChanges();
  }
  getSingleFile(clientId) {
    return this.dbRef.doc(clientId).snapshotChanges();
  }
  updateFiles(file, clientId) {
    return this.dbRef.doc(clientId).update(file);
  }
  delFiles(clientId) {
    return this.dbRef.doc(clientId).delete();
  }
}
