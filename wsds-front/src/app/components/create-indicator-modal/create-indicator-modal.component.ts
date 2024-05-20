import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IIndicatorEntry} from "../../interfaces/indicators.interface";
import {IndicatorService} from "../../services/indicator.service";
import {generateObjectId} from "../../utils/utils";

@Component({
  selector: 'app-create-indicator-modal',
  templateUrl: './create-indicator-modal.component.html',
  styleUrl: './create-indicator-modal.component.scss'
})
export class CreateIndicatorModalComponent {
  settingForm!: FormGroup
  constructor(
    public dialogRef: MatDialogRef<CreateIndicatorModalComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {setting: IIndicatorEntry, isCreate: boolean}, private fb: FormBuilder,  private indicatorService: IndicatorService
  ) {}
  ngOnInit(){
    this.settingForm = this.fb.group({
      indicator_name:  ["", Validators.required],
      prompt:  ["", Validators.required],
    })
  }

  saveForm() {
    if (this.settingForm.valid){
      const {indicator_name, prompt} =  this.settingForm.value
      const newIndicator = {
        indicator_name,
        prompt,
        id: generateObjectId()
      }
      this.data.setting.indicators.push(newIndicator)
      this.indicatorService.updateEntry(this.data.setting.id, this.data.setting).subscribe(value => {
        this._snackBar.open("Cambios realizados con exito", "Cerrar", {
          duration: 3000
        });
        this.dialogRef.close();
      }, error => {
        this._snackBar.open("Ocurrio un error durante la creación", "Cerrar", {
          duration: 1000
        });
        this.dialogRef.close();
      })
    }

  }
}
