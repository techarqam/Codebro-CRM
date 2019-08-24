import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import * as moment from 'moment';
import { TasksService } from '../../../Sercvices/Tasks/tasks.service';
import { ClientsService } from '../../../Services/Clients/clients.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {

  task: any = {};
  client: any = {};
  showLoader: boolean = false;
  constructor(
    public taskService: TasksService,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public clientService: ClientsService,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getTask(params['id']);
    });
  }

  ngOnInit() { }

  getTask(id) {
    this.taskService.getSingleTask(id).subscribe(snap => {
      this.task = snap.payload.data();
      this.task.id = snap.payload.id;
      this.getClient(this.task.client);
    })
  }
  async deleteTaskConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + this.client.name,
      message: 'This action cannot be reversed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: data => {
            this.commonService.presentToast("Client Name not Valid");
          }
        }
      ]
    });
    return await alert.present();

  }
  deleteTask() {
    this.showLoader = true;
    this.taskService.delTasks(this.task.id).then(() => {
      this.commonService.presentToast("Task Deleted");
      this.showLoader = false;
      this.navCtrl.navigateRoot("/all-tasks");
    })
  }
  getClient(id) {
    if (id) {
      this.clientService.getSingleClient(id).subscribe(snap => {
        this.client = snap.payload.data();
        this.client.id = snap.payload.id;
      })
    }
  }
}
