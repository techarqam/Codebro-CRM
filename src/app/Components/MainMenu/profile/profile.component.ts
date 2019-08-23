import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  picShowLoader: boolean = false;
  img1: any;
  img2: any;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public commonService: CommonService,
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      this.getUser(user.uid);
    })
  }

  ngOnInit() { }

  getUser(id) {
    this.authService.getUser(id).subscribe(snap => {
      this.user = snap.payload.data();
      this.user.id = snap.payload.id;
    });
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
    this.uploadImage();
  }
  uploadImage() {
    this.picShowLoader = true;
    this.authService.uploadProfilePic(this.user, this.img2).then(() => {
      this.picShowLoader = false;
      this.commonService.presentToast("Profile Picture Updated");
    })
  }

}
