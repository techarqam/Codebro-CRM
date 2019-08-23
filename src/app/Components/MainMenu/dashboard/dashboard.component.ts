import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  name: string = '';
  constructor(
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public authService: AuthService,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
