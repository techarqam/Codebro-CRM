import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
  getTasks() {
    return this.dbRef.snapshotChanges();
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
