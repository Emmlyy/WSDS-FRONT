import { Component } from '@angular/core';
import {IndicatorService} from "../../services/indicator.service";
import {IIndicator, IIndicatorEntry} from "../../interfaces/indicators.interface";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {IndicatorModalComponent} from "../indicator-modal/indicator-modal.component";
import {MessageDialogComponent} from "../message-dialog/message-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  isEditModeEnable: boolean = false;
  currentSetting: string = "";
  indicatorsAvailable: IIndicatorEntry[] = []
  currentIndicators!: IIndicatorEntry;
  indicatorForm!: FormGroup;

  constructor(private indicatorService: IndicatorService, private fb: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar,) {
  }

  get indicatorsForm() {
    return this.indicatorForm.get('inputs') as FormArray;
  }


  ngOnInit(){
    this.indicatorForm = this.fb.group({
      inputs:  new FormArray([]),
    });
    this.getAllSettings()

  }
  getAllSettings(){
    this.indicatorService.getAllPromptEntryData().subscribe(items => {
      this.indicatorService.getCurrentSetting().subscribe(val => {
        this.currentSetting = val.value
        this.indicatorsAvailable = items;
        this.currentIndicators =  this.indicatorsAvailable.find(element =>
          element.id == this.currentSetting) ?? {
          indicators: [],
          id: "",
          name: ""
        }
        if (this.currentIndicators){
          this.indicatorsForm.clear()
          this.indicatorForm.setControl("inputs", this.fb.array( this.currentIndicators.indicators.map((value) => this.fb.control(value.prompt))))
        }
        console.log(this.indicatorsForm.controls)
      })
    }, error => {
      console.log(error)
    })
  }
  changeSetting() {
    console.log(this.currentSetting)
    this.currentIndicators =  this.indicatorsAvailable.find(element =>
      element.id == this.currentSetting) ?? {
      indicators: [],
      id: "",
      name: ""
    }
    this.indicatorService.updateSetting(this.currentSetting).subscribe(value =>{
      this._snackBar.open("Nueva configuración activa", "Cerrar", {
        duration: 100
      });
    })
    console.log(this.currentIndicators)
    this.indicatorsForm.clear()
    this.indicatorForm.setControl("inputs", this.fb.array( this.currentIndicators.indicators.map((value) => this.fb.control(value.prompt))))
  }

  /*toggleFormEdit() {
    this.isEditModeEnable ? this.indicadoresForm.disable() : this.indicadoresForm.enable();
  }*/
  changeSettingName() {
    const dialogRef  = this.dialog.open(IndicatorModalComponent, {
      data: {setting: this.currentIndicators, isCreate: false},
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllSettings()
    });
  }

  createSetting() {
    const dialogRef  = this.dialog.open(IndicatorModalComponent, {
      data: {setting: {}, isCreate: true},
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllSettings()
    });
  }

  deleteSetting() {
    const dialogRef  = this.dialog.open(MessageDialogComponent, {
      data: {title: "Confirmación", message: "Segudo desea eliminar esta configuración", action: "Aceptar"},
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.indicatorService.deleteEntry(this.currentSetting).subscribe(value =>{
          this._snackBar.open("Cambios realizados con exito", "Cerrar", {
            duration: 3000
          });
          this.getAllSettings()
        })
      }
    });
  }
}
