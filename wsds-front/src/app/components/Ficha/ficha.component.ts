import {Component, Input } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class DialogContent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FichaContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './ficha-content-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class FichaContentDialog {}

@Component({
  selector: 'app-button-report',
  templateUrl: './buttonReport.html',
  //styleUrls: ['./button.component.css']
})
export class ButtonReportComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FichaContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
