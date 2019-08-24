import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../Services/Files/files.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss'],
})
export class ViewFilesComponent implements OnInit {
  showLoader: boolean = false;
  files: Array<any> = [];
  filesLoaded: Array<any> = [];
  constructor(
    public filesService: FilesService,
    public navCtrl: NavController,
  ) {
    this.getFiles();
  }

  ngOnInit() { }
  getFiles() {
    this.showLoader = true;
    this.filesService.getFiles().subscribe(snap => {
      let tempArray = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        temp.timestamp = moment(temp.timestamp).fromNow();
        tempArray.push(temp);
      })
      this.files = tempArray;
      this.filesLoaded = tempArray;
      this.showLoader = false;
    });
  }


  initializeItems(): void {
    this.files = this.filesLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q: string = searchbar;
    if (!q.length) {
      return;
    }
    this.files = this.files.filter((v) => {
      if ((v.name) && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  gtDetails(f) {
    this.navCtrl.navigateRoot(`/file-details/${f.id}`);
  }

}
