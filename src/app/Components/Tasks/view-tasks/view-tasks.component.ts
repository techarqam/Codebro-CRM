import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TasksService } from 'src/app/Services/Tasks/tasks.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {

  showLoader: boolean = false;
  assignedToTasks: Array<any> = [];
  assignedByTasks: Array<any> = [];
  // tasksLoaded: Array<any> = [];

  showAssignedTo: boolean = true;
  showAssignedBy: boolean = false;
  constructor(
    public tasksService: TasksService,
    public navCtrl: NavController,
  ) {
    this.getassignedToTasks();
    this.getassignedByTasks();
  }

  ngOnInit() { }
  getassignedToTasks() {
    this.showLoader = true;
    this.tasksService.getAssignedToTasks().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.assignedToTasks = tempArray;
      this.showLoader = false;
    });
  }
  getassignedByTasks() {
    this.showLoader = true;
    this.tasksService.getassignedByTasks().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.assignedByTasks = tempArray;
      this.showLoader = false;
    });
  }


  // initializeItems(): void {
  //   this.tasks = this.tasksLoaded;
  // }
  // getItems(searchbar) {
  //   this.initializeItems();
  //   let q: string = searchbar;
  //   if (!q.length) {
  //     return;
  //   }
  //   this.tasks = this.tasks.filter((v) => {
  //     if ((v.name) && q) {
  //       if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });
  // }
  gtDetails(t) {
    this.navCtrl.navigateRoot(`/task-details/${t.id}`);
  }
  segmentChanged(ev) {
    if (ev.detail.value == "assignedTo") {
      this.showAssignedTo = true;
      this.showAssignedBy = false;
    } else {
      this.showAssignedTo = false;
      this.showAssignedBy = true;
    }
 
  }
}
