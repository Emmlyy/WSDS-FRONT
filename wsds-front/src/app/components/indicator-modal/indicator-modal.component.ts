import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IIndicatorEntry} from "../../interfaces/indicators.interface";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IndicatorService} from "../../services/indicator.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-indicator-modal',
  templateUrl: './indicator-modal.component.html',
  styleUrl: './indicator-modal.component.scss'
})
export class IndicatorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<IndicatorModalComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {setting: IIndicatorEntry, isCreate: boolean}, private fb: FormBuilder,  private indicatorService: IndicatorService
  ) {}
  settingForm!: FormGroup
  ngOnInit(){
    console.log(this.data)
    this.settingForm = this.fb.group({
      name:  [this.data.setting.name, Validators.required],
    })
  }

  saveForm() {
    if (this.data.isCreate && this.settingForm.valid){

    }
    else if (this.settingForm.valid){
      const name = this.settingForm.value
      const newEntry : IIndicatorEntry= {
        ...name,
        id: this.data.setting.id,
        indicators: this.data.setting.indicators
      }
      this.indicatorService.updateEntry(newEntry.id, newEntry).subscribe(value => {
        this._snackBar.open("Cambios realizados con exito", "Cerrar", {
          duration: 3000
        });
        this.dialogRef.close();
      }, error => console.log(error))
    }
  }
}
