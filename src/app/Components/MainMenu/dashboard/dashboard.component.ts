import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ClientsService } from '../../../Services/Clients/clients.service';
import { Chart } from "chart.js";

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
  ) {
    this.menuCtrl.enable(true);
    this.getClients();
    this.getProjects();
    this.getTasks();
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
              "rgba(0,100,0, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
            hoverBackgroundColor: ["#006400", "#FF6384"]
          }
        ]
      }
    });
  }

}
