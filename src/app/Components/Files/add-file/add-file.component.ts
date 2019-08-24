import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModelsService } from '../../../Models/models';
import { CommonService } from '../../../Services/Common/common.service';
import { FilesService } from '../../../Services/Files/files.service';
import { NavController } from '@ionic/angular';
import { ProjectService } from '../../../Services/Projects/project.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent implements OnInit {

  showLoader: boolean = false;
  projects: Array<any> = [];
  constructor(
    public modelService: ModelsService,
    public commonService: CommonService,
    public filesService: FilesService,
    public projectService: ProjectService,
    public navCtrl: NavController,
  ) {
    this.getProjects();
  }

  ngOnInit() { }
  addFile() {
    let data = this.modelService.file.value;
    if (this.modelService.file.valid) {
      this.showLoader = true;
      this.filesService.addFile(data).then(() => {
        this.modelService.file.reset();
        this.modelService.file.patchValue({
          user: firebase.auth().currentUser.uid,
          timestamp: moment().format()
        });
        this.navCtrl.navigateRoot('/all-files');
        this.showLoader = false;
        this.commonService.presentToast("File added");
      })
    } else {
      this.commonService.presentToast("File not valid")
    }
  }

  getProjects() {
    this.showLoader = true;
    this.projectService.getProjects().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.projects = tempArray;
      this.showLoader = false;
    });
  }

}
