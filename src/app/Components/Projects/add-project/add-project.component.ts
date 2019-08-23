import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../Models/models';
import { CommonService } from '../../../Services/Common/common.service';
import { ProjectService } from '../../../Services/Projects/project.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {

  showLoader: boolean = false;
  constructor(
    public modelService: ModelsService,
    public commonService: CommonService,
    public projectService: ProjectService,
    public navCtrl: NavController,
  ) {
  }

  ngOnInit() { }
  addProject() {
    let data = this.modelService.project.value;
    if (this.modelService.project.valid) {
      this.showLoader = true;
      this.projectService.addProject(data).then(() => {
        this.modelService.project.reset();
        this.modelService.project.patchValue({
          archived: false,
          timestamp: moment().format()
        });
        this.navCtrl.navigateRoot('/projects');
        this.showLoader = false;
        this.commonService.presentToast("Project added");
      })
    } else {
      this.commonService.presentToast("Project not valid")
    }
  }
}
