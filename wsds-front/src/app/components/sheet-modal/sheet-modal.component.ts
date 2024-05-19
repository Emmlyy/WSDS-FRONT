import {AfterViewInit, Component, ElementRef, Inject, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ISheet, IsheetModal} from '../../interfaces/news.interface';
import {GemmaService} from '../../services/gemma.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent  implements AfterViewInit {
  isDisabled = true; // Propiedad para controlar el estado de los inputs
  isSheetSaved = false;
  constructor(
    public dialogRef: MatDialogRef<SheetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IsheetModal,
    private gemmaService: GemmaService,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChildren('textarea') textAreas!: QueryList<ElementRef>;
  ngOnInit() {
    this.isSheetSaved = this.data.newSaved.sheet !== null
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
          this.openSnackBar("Guardado con exito", "Cerrar")
          console.log('Sheet updated successfully', response);
        },
        error => {
          console.error('Error updating sheet', error);
          this.openSnackBar("No se guardo ningun cambio", "Cerrar")
        }
      );
    }
  }

  validateSheet() {
    if (this.data.newSaved.sheet){
      this.data.newSaved.sheet.priority = 2
      this.gemmaService.updateSheet(this.data.newSaved.sheet).subscribe(
        response => {
          this.openSnackBar("Validación con exito", "Cerrar")
          console.log('Sheet updated successfully', response);
        },
        error => {
          this.openSnackBar("No se guardo ningun cambio", "Cerrar")
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  fillNewSheet() {
    this.gemmaService.getIndicators().subscribe(indicators =>
      {
        const newIndicators: { indicator_name: string; response: string }[] = []
        for (const item of indicators){
          newIndicators.push({
            indicator_name: item.indicator_name,
            response: ""
          })
        }
        this.data.newSaved.sheet = {
          indicators: newIndicators,
          priority: 1,
          id: this.data.newSaved.url
        }
        this.isSheetSaved = true
        this.gemmaService.createSheet(this.data.newSaved.sheet).subscribe(value => {
          console.log(value)
          this.openSnackBar("Ficha creada lista para ser llenada", "Cerrar")
          this.toggleEdit()
        }, error => {
          this.openSnackBar("Error creando ficha", "Cerrar")
        })
      }
    )
  }

  generateSheetAI() {
    this.gemmaService.generateSheet(this.data.newSaved).subscribe(value => {
      this.data.newSaved.sheet = {
        indicators: value,
        priority: 3,
        id: this.data.newSaved.url
      }
      this.isSheetSaved = true
      this.gemmaService.createSheet(this.data.newSaved.sheet).subscribe(value => {
        console.log(value)
        setTimeout(() => {
          this.textAreas.forEach((textAreaRef) => {
            const textArea = textAreaRef.nativeElement as HTMLTextAreaElement;
            textArea.style.height = 'auto';  // Reset the height
            textArea.style.height = textArea.scrollHeight + 'px';  // Set the height based on scroll height
          });
        }, 0);
        this.openSnackBar("Ficha creada lista para ser llenada", "Cerrar")
      }, error => {
        this.openSnackBar("Error creando ficha", "Cerrar")
      })
    })
  }
}
