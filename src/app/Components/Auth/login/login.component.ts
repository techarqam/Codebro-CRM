import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, NavController, MenuController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CommonService } from '../../../Services/Common/common.service';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;



  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmR: any;

  @ViewChild('digit1') digit1: ElementRef;
  @ViewChild('digit2') digit2: ElementRef;
  @ViewChild('digit3') digit3: ElementRef;
  @ViewChild('digit4') digit4: ElementRef;
  @ViewChild('digit5') digit5: ElementRef;
  @ViewChild('digit6') digit6: ElementRef;



  constructor(
    public authService: AuthService,
    public commonService: CommonService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  checkPhone() {
    if (this.authService.signInPhone.valid) {
      let temp: any = this.authService.signInPhone.value;
      this.signIn(temp.phone);
    } else {
      this.commonService.presentToast("Phone Number not Valid")
    }
  }

  signIn(phone) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + phone;

    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        this.confirmR = confirmationResult;
      }).then(() => {
        this.gtSecond();
        this.commonService.presentToast("OTP Sent");
      }).catch(function (error) {
        let msg = error.message;
        console.log(msg)
        this.commonService.presentToast(msg);
      });
  }

  checkOtp() {
    let temp: any = this.authService.signInOtp.value;
    temp.otp = this.sum(temp);
    if (this.authService.signInOtp.valid) {
      this.verifyOtp(temp.otp);
    } else {
      this.commonService.presentToast("OTP not Valid")
    }
  }

  verifyOtp(itp) {
    itp = itp.toString()
    this.confirmR.confirm(itp).then(() => {
      this.navCtrl.navigateRoot(`/`);
    }).catch(function (error) {
      this.commonService.presentToast(error.message);
    });;
  }


  sum(obj) {
    var sum = '';
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += obj[el];
      }
    }
    return sum;
  }


  setNextFocus(nu) {
    eval("this.authService.signInOtp.patchValue({ digit" + nu + ": '' }); this.digit" + nu + ".nativeElement.focus()")
  }





  //Slide functions
  gtSecond() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
    this.setNextFocus(1);

  }
  gtFirst() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 500);
    this.slides.lockSwipes(true);
  }
}
