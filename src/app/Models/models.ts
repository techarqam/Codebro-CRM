import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';
export class ModelsService {


    project = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        client: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        description: new FormControl(""),
        archived: new FormControl(false),
        user: new FormControl(firebase.auth().currentUser.uid),
        timestamp: new FormControl(moment().format())
    });
    client = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        phone: new FormControl("", Validators.compose([
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
        ])),
        mail: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        user: new FormControl(firebase.auth().currentUser.uid),
        timestamp: new FormControl(moment().format())
    });
    file = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        project: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        user: new FormControl(firebase.auth().currentUser.uid),
        timestamp: new FormControl(moment().format())
    });
    task = new FormGroup({
        type: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        description: new FormControl(""),
        client: new FormControl(""),
        status: new FormControl("Pending"),
        assignTo: new FormControl(firebase.auth().currentUser.uid),
        assignedBy: new FormControl(firebase.auth().currentUser.uid),
        dueTime: new FormControl(moment().format(), Validators.compose([
            Validators.required,
        ])),
        timestamp: new FormControl(moment().format())
    });
    message = new FormGroup({
        message: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        reciever: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        sender: new FormControl(""),
        timestamp: new FormControl(moment().format())
    });

    invoice = new FormGroup({
        startDate: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        endDate: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        amount: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        generatedBy: new FormControl(firebase.auth().currentUser.uid),
        timestamp: new FormControl(moment().format())
    });

}