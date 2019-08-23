import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  @Input() name: string;
  constructor(
    public authService: AuthService,
    public popoverController: PopoverController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() { }

}
