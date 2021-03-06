import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ClientsService } from '../../../Services/Clients/clients.service';
import { Chart } from "chart.js";
import { NotificationsService } from 'src/app/Services/Notifications/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  totProjects: number = 0;
  totClients: number = 0;

  @ViewChild("tasksCanvas") tasksCanvas: ElementRef;
  private tasksChart: Chart;

  constructor(
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public authService: AuthService,
    public projectService: ProjectService,
    public clientService: ClientsService,
    public notiService: NotificationsService,
  ) {
    this.menuCtrl.enable(true);
    this.getClients();
    this.getProjects();
    this.getTasks();
    this.notiService.getToken();
  }

  ngOnInit() {
    this.loadTasksChart();
  }
  getProjects() {
    this.projectService.getProjects().subscribe(snap => {
      this.totProjects = snap.length;
    })
  }
  getClients() {
    this.clientService.getClients().subscribe(snap => {
      this.totClients = snap.length;
    })
  }
  //Todo Calculate Tasks
  getTasks() {

  }
  loadTasksChart() {
    this.tasksChart = new Chart(this.tasksCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending"],
        datasets: [
          {
            label: "# of tasks",
            data: [12, 19],
            backgroundColor: [
              "rgba(56, 128, 255, 0.6)",
              "rgba(240, 65, 65, 0.6)",
            ],
            hoverBackgroundColor: ["#3880ff", "#f04141"]
          }
        ]
      }
    });
  }

}
