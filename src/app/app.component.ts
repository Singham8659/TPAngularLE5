import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pokemon';

  isConnected():boolean{
    var connected = localStorage.getItem("connected");
    if(!connected || connected == null){
      return false;
    }
    return true
  }

}
