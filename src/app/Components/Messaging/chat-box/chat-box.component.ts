import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../Services/Messaging/messaging.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../Services/Common/common.service';
import { ModelsService } from '../../../Models/models';
import * as moment from 'moment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {

  user: any = {};
  showLoader: boolean = false;
  messages: Array<any> = [];
  sentMessages: Array<any> = [];
  recievedMessages: Array<any> = [];
  constructor(
    public messagingService: MessagingService,
    public alertCtrl: AlertController,
    private router: ActivatedRoute,
    public modelService: ModelsService,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getUser(params['id']);
    });
  }

  ngOnInit() { }
  getUser(id) {
    this.messagingService.getSingleUser(id).subscribe(snap => {
      this.user = snap.payload.data();
      this.user.id = snap.payload.id;
      this.getSentMessages(this.user.id);
      // this.getRecievedMessages(this.user.id);
    })

  }
  sendMessage() {
    let data = this.modelService.message.value;
    if (data.message.length) {
      data.reciever = this.user.id;
      data.sender = firebase.auth().currentUser.uid;
      data.timestamp = moment().format();
      this.modelService.message.reset();
      this.messagingService.sendMessage(data);
    }

  }
  getSentMessages(recieverId) {
    this.showLoader = true;
    this.messages = [];
    this.messagingService.getSentMessages(recieverId).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.type = "sent";
        temp.slotPlace = "end";
        temp.timestampDisplay = moment(temp.timestamp).fromNow();
        this.messages.push(temp);
      })
    })
    this.messagingService.getRecivedMessages(recieverId).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.type = "recieved";
        temp.slotPlace = "start";
        temp.timestampDisplay = moment(temp.timestamp).fromNow();
        this.messages.push(temp);
      })
    })
    //Sorting problem
    this.sortMessages();
    this.showLoader = false;
  }
  sortMessages() {
    console.log('messages 1 :', this.messages)
    this.messages.sort((val1, val2) => {
      let x: any = new Date(val1.timestamp);
      let y: any = new Date(val2.timestamp);
      return x - y
    })
    console.log('messages 2 :', this.messages)
  }

}
