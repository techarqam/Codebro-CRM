import { Component, OnInit,ViewChild  } from '@angular/core';
import { CalendarService } from 'src/app/Services/Calendar/calendar.service';
import { TasksService } from 'src/app/Services/Tasks/tasks.service';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {



  assignedToTasks: Array<any> = [];
  assignedByTasks: Array<any> = [];

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    // { title: 'Event Now', start: new Date() }
  ];


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



  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    console.log(' arg:',arg.date)
    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay
    //   })
    // }
  }

}
