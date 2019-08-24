import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../Services/Messaging/messaging.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  showLoader: boolean = false;
  users: Array<any> = [];
  usersLoaded: Array<any> = [];
  constructor(
    public messagingService: MessagingService,
    public navCtrl: NavController,
  ) {
    this.getUsers();
  }

  ngOnInit() { }
  getUsers() {
    this.showLoader = true;
    this.messagingService.getUsers().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        if (temp.id != firebase.auth().currentUser.uid) {
          tempArray.push(temp);
        }
      })
      this.users = tempArray;
      this.usersLoaded = tempArray;
      this.showLoader = false;
    });
  }


  initializeItems(): void {
    this.users = this.usersLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.users = this.users.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  gtChat(c) {
    this.navCtrl.navigateRoot(`/chat-box/${c.id}`);
  }
}
