import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Services/Projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss'],
})
export class ProjectFilesComponent implements OnInit {

  project: any = {};
  files: any = {};
  filesLoaded: any = {};
  showLoader: boolean = false;
  defHref: string = "";
  constructor(
    public projectService: ProjectService,
    public alertCtrl: AlertController,
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getProject(params['id']);
      this.getFiles(params['id']);
    });
  }

  getProject(id) {
    this.projectService.getSingleProject(id).subscribe(snap => {
      this.project = snap.payload.data();
      if (this.project.archived) { this.project.archivedStatus = "Archived" } else { this.project.archivedStatus = "Not Archived"; }
      this.project.id = snap.payload.id;
      this.defHref = "/project-details/" + this.project.id;
      console.log('this.defHref :', this.defHref)
    })
  }
  ngOnInit() { }
  getFiles(projectId) {
    this.projectService.getFiles(projectId).subscribe(snap => {
      snap.forEach(snip => {
        let tempArray = [];
        snap.forEach(snip => {
          let temp: any = snip.payload.doc.data();
          temp.id = snip.payload.doc.id;
          temp.timestamp = moment(temp.timestamp).fromNow();
          tempArray.push(temp);
        })
        console.log('files:', this.files)
        this.files = tempArray;
        this.filesLoaded = tempArray;
        this.showLoader = false;
      })
    })
  }
  gtDetails(f) {
    this.navCtrl.navigateRoot(`/file-details/${f.id}`);
  }

}
