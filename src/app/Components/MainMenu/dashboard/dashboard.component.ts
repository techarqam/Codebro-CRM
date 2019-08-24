import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ClientsService } from '../../../Services/Clients/clients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  totProjects: number = 0;
  totClients: number = 0;
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
  }

  ngOnInit() {
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
}
