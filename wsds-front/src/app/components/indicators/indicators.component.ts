import { Component } from '@angular/core';
import {IndicatorService} from "../../services/indicator.service";
import {IIndicator, IIndicatorEntry} from "../../interfaces/indicators.interface";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {IndicatorModalComponent} from "../indicator-modal/indicator-modal.component";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  isEditModeEnable: boolean = false;
  currentSetting: string = "202405-1622-2128-85e71527-8fbf-4889-baa1-3ff5ad6194ec";
  indicatorsAvailable: IIndicatorEntry[] = []
  currentIndicators!: IIndicatorEntry;
  indicatorForm!: FormGroup;

  constructor(private indicatorService: IndicatorService, private fb: FormBuilder, private dialog: MatDialog) {
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
      console.log(items)
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
}
