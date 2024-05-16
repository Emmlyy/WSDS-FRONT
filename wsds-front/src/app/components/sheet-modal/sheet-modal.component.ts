import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IsheetModal } from '../../interfaces/news.interface';

@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrl: './sheet-modal.component.scss',
})
export class SheetModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SheetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IsheetModal
  ) {}
  ngOnInit() {
    console.log(this.data.newSaved.sheet);
  }
}
