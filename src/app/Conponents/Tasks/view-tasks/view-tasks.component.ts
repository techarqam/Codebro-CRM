import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../Sercvices/Tasks/tasks.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {

  showLoader: boolean = false;
  tasks: Array<any> = [];
  tasksLoaded: Array<any> = [];
  constructor(
    public tasksService: TasksService,
    public navCtrl: NavController,
  ) {
    this.getTasks();
  }

  ngOnInit() { }
  getTasks() {
    this.showLoader = true;
    this.tasksService.getTasks().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.tasks = tempArray;
      this.tasksLoaded = tempArray;
      this.showLoader = false;
    });
  }


  initializeItems(): void {
    this.tasks = this.tasksLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.tasks = this.tasks.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  gtDetails(t) {
    this.navCtrl.navigateRoot(`/task-details/${t.id}`);
  }

}
