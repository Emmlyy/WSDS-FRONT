import {Component, Input } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-news',
  templateUrl: './dialog-content.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatCardModule],
})
export class DialogContentNews {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-news',
  templateUrl: './news-content-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule],
})
export class NewsContentDialog {}

@Component({
  selector: 'app-button-read',
  templateUrl: './buttonReadNews.html',
  //styleUrls: ['./button.component.css']
})
export class ButtonReadComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewsContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
