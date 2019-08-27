import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  dbRef = this.db.collection(`Tasks`, ref => ref.orderBy('timestamp', 'desc'));

  constructor(
    public db: AngularFirestore,
  ) { }
  addTask(task) {
    return this.dbRef.add(task);
  }
  getAssignedToTasks() {
    return this.db.collection(`Tasks`, ref => ref.where("assignTo", "==", firebase.auth().currentUser.uid).orderBy('timestamp', 'desc')).snapshotChanges();
  }
  getassignedByTasks() {
    return this.db.collection(`Tasks`, ref => ref.where("assignedBy", "==", firebase.auth().currentUser.uid).orderBy('timestamp', 'desc')).snapshotChanges();
  }
  getSingleTask(taskId) {
    return this.dbRef.doc(taskId).snapshotChanges();
  }
  updateTasks(task, taskId) {
    return this.dbRef.doc(taskId).update(task);
  }
  delTasks(taskId) {
    return this.dbRef.doc(taskId).delete();
  }
}
