import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../Services/Files/files.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import * as moment from 'moment';
import { ProjectService } from '../../../Services/Projects/project.service';
@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss'],
})
export class FileDetailsComponent implements OnInit {

  file: any = {};
  project: any = {};
  showLoader: boolean = false;
  constructor(
    public fileService: FilesService,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public commonService: CommonService,
    public projectService: ProjectService,
  ) {
    this.router.params.subscribe(params => {
      this.getFile(params['id']);
    });
  }

  ngOnInit() { }

  getFile(id) {
    this.fileService.getSingleFile(id).subscribe(snap => {
      this.file = snap.payload.data();
      this.file.id = snap.payload.id;
      this.file.timestamp = moment(this.file.timestamp).fromNow();
      this.getProject(this.file.project);
    })
  }
  async deleteFileConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + this.file.name,
      message: 'This action cannot be reversed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'File Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: data => {
            if (data.name.toLowerCase() == this.file.name.toLowerCase()) {
              this.deleteFile();
            } else {
              this.commonService.presentToast("File Name not Valid");
            }
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();

  }
  deleteFile() {
    this.showLoader = true;
    this.fileService.delFiles(this.file.id).then(() => {
      this.commonService.presentToast("File Deleted");
      this.showLoader = false;
      this.navCtrl.navigateRoot("/files");
    })
  }

  getProject(projectId) {
    this.projectService.getSingleProject(projectId).subscribe(snap => {
      if (snap.payload.exists) {
        this.project = snap.payload.data();
      } else {
        this.project = { name: "No Project" };
      }
    })
  }
}
