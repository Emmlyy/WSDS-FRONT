import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ISheetModal} from "../../interfaces/news.interface";
import {GemmaService} from "../../services/gemma.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-read-new',
  templateUrl: './read-new.component.html',
  styleUrl: './read-new.component.scss'
})
export class ReadNewComponent {
  constructor(
    public dialogRef: MatDialogRef<ReadNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISheetModal,
    private gemmaService: GemmaService,
    private _snackBar: MatSnackBar
  ) {}
}
