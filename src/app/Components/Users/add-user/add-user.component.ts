import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/Common/common.service';
import { UserService } from 'src/app/Services/Users/user.service';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  showLoader: boolean = false;

  constructor(
    public commonService: CommonService,
    public userService: UserService,
    public navCtrl: NavController,
  ) {

  }

  ngOnInit() { }



  addUser() {
    let data = this.userService.user.value;

    if (this.userService.user.valid) {
      this.showLoader = true;
      data.addedBy = firebase.auth().currentUser.uid,

        this.userService.addUser(data);
      this.userService.user.reset();
      this.userService.user.patchValue({
        isAdmin: false,
        status: "Unverified",
        addedBy: firebase.auth().currentUser.uid,
        timestamp: moment().format()
      });
      this.navCtrl.navigateRoot(`/all-users`);
      this.showLoader = false;
      this.commonService.presentToast("User added");

    } else {
      this.commonService.presentToast("User not valid")
    }

  }
}
