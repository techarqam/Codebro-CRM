import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/Services/Calendar/calendar.service';
import { TasksService } from 'src/app/Services/Tasks/tasks.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  assignedToTasks: Array<any> = [];
  assignedByTasks: Array<any> = [];

  constructor(
    public calendarService: CalendarService,
    public tasksService: TasksService,
  ) {
    this.getassignedByTasks();
    this.getassignedToTasks();
  }


  ngOnInit() {
  }




  getassignedByTasks() {
    this.tasksService.getAssignedToTasks().subscribe(snap => {
      this.tasksService.getAssignedToTasks().subscribe(snap => {
        let tempArray = [];
        snap.forEach(snip => {
          let temp: any = snip.payload.doc.data();
          temp.id = snip.payload.doc.id;
          temp.timestamp = moment(temp.timestamp).fromNow();
          tempArray.push(temp);
        })
        this.assignedToTasks = tempArray;
      });

    })
  }

  getassignedToTasks() {
    this.tasksService.getassignedByTasks().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.assignedByTasks = tempArray;
    });
  }



}
