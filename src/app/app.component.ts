import { Component } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './Services/Auth/auth.service';
import { NotificationsService } from './Services/Notifications/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  leftBrace: string = "{";
  rightBrace: string = "}";
  pendingTasks = [
    "Timeline Addition",
    "Notifications",
    "Chat order",
    "dashboard task chart",
    "generating documents",
  ]
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'analytics'
    },
    {
      title: 'Timeline',
      url: '/timeline',
      icon: 'pulse'
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: 'people'
    },
    {
      title: 'Projects',
      url: '/projects',
      icon: 'bug'
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar'
    },
    {
      title: 'Tasks',
      url: '/all-tasks',
      icon: 'hammer'
    },
    {
      title: 'Messaging',
      url: '/messaging',
      icon: 'chatbubbles'
    },
    {
      title: 'Files',
      url: '/all-files',
      icon: 'document'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    public alertController: AlertController,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public notiService: NotificationsService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.notiService.subscribeNotifications();
      this.notiService.showMessages();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  async signOutConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: "I'm Sure",
          handler: () => {
            this.authService.logout().then(() => {
              this.navCtrl.navigateRoot('login');
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
