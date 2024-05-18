import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IsheetModal } from '../../interfaces/news.interface';
import { GemmaService } from '../../services/gemma.service';
@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent {
  isDisabled = true; // Propiedad para controlar el estado de los inputs

  constructor(
    public dialogRef: MatDialogRef<SheetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IsheetModal,
    private gemmaService: GemmaService
  ) {}

  ngOnInit() {
    console.log(this.data.newSaved.sheet);
  }

  toggleEdit() {
    if (this.isDisabled) {
      this.isDisabled = false;
    } else {
      this.saveChanges();
      this.isDisabled = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  cancelEdit(): void {
    this.isDisabled = true;
  }

  saveChanges(): void {
    this.gemmaService.updateSheet(this.data.newSaved.sheet).subscribe(
      response => {
        console.log('Sheet updated successfully', response);
      },
      error => {
        console.error('Error updating sheet', error);
      }
    );
  }
}
