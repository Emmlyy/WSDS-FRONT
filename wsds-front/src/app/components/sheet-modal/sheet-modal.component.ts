import {AfterViewInit, Component, ElementRef, Inject, QueryList, ViewChildren} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IsheetModal } from '../../interfaces/news.interface';
import { GemmaService } from '../../services/gemma.service';
@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent  implements AfterViewInit {
  isDisabled = true; // Propiedad para controlar el estado de los inputs

  constructor(
    public dialogRef: MatDialogRef<SheetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IsheetModal,
    private gemmaService: GemmaService
  ) {}
  @ViewChildren('textarea') textAreas!: QueryList<ElementRef>;
  ngOnInit() {
    console.log(this.data.newSaved);
  }
  adjustTextAreaHeight(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    //textArea.style.height = 'auto';  // Reset the height
    textArea.style.height = textArea.scrollHeight + 'px';  // Set the height to scroll height
    //console.log(textArea)
  }
  toggleEdit() {
    if (this.isDisabled) {
      this.isDisabled = false;
    } else {
      this.saveChanges();
      this.isDisabled = true;
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.textAreas.forEach((textAreaRef) => {
        const textArea = textAreaRef.nativeElement as HTMLTextAreaElement;
        textArea.style.height = 'auto';  // Reset the height
        textArea.style.height = textArea.scrollHeight + 'px';  // Set the height based on scroll height
      });
    }, 0);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  cancelEdit(): void {
    this.isDisabled = true;
  }

  saveChanges(): void {
    if (this.data.newSaved.sheet){
      this.data.newSaved.sheet.priority = 1
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

  validateSheet() {
    if (this.data.newSaved.sheet){
      this.data.newSaved.sheet.priority = 2
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
}
