import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CommonService } from 'src/app/Services/Common/common.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    public menuCtrl: MenuController,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) {

    this.menuCtrl.enable(false);

  }

  ngOnInit() { }



  onSubmit() {
    let data = this.userService.signIn.value;
    this.authService.loginM(data).then(res => {
      this.userService.signIn.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    }).then(() => {
      if (this.authService.isLoggedIn()) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }
}
