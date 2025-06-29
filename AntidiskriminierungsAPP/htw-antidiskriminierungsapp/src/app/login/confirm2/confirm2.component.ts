import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../login.component';

@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm2.component.html',
  styleUrls: ['./confirm2.component.css']
})
export class Confirm2Component {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}