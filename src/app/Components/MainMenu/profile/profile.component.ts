import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  showLoader: boolean = true;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.authService.getProfile().subscribe(snap => {
      this.user = snap.payload.data();
      this.user.id = snap.payload.id;
    });
  }
}
