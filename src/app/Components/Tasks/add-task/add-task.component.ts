import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModelsService } from '../../../Models/models';
import { CommonService } from '../../../Services/Common/common.service';
import { NavController } from '@ionic/angular';
import { TasksService } from '../../../Sercvices/Tasks/tasks.service';
import { ClientsService } from '../../../Services/Clients/clients.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  showLoader: boolean = false;
  clients: Array<any> = [];
  constructor(
    public modelService: ModelsService,
    public clientService: ClientsService,
    public commonService: CommonService,
    public taskService: TasksService,
    public navCtrl: NavController,
  ) {
    this.getClients();
  }

  types: Array<any> = ["Meeting", "Called", "Call Recieved", "Send Quotation", "Send Invoice",];
  ngOnInit() { }
  addTask() {
    let data = this.modelService.task.value;
    if (this.modelService.task.valid) {
      this.showLoader = true;
      this.taskService.addTask(data).then(() => {
        this.modelService.task.reset();
        this.modelService.project.patchValue({
          user: firebase.auth().currentUser.uid,
          timestamp: moment().format()
        });
        this.navCtrl.navigateRoot('/all-tasks');
        this.showLoader = false;
        this.commonService.presentToast("Task added");
      })
    } else {
      this.commonService.presentToast("Task not valid")
    }
  }
  getClients() {
    this.clientService.getClients().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.clients = tempArray;
    });
  }

}
