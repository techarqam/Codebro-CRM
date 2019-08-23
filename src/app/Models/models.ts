import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
export class ModelsService {


    project = new FormGroup({
        name: new FormControl(""),
        archived: new FormControl(false),
        timestamp: new FormControl(moment().format())
    });



    client = new FormGroup({
        name: new FormControl(""),
        timestamp: new FormControl(moment().format())
    });

}