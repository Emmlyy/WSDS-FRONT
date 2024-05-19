import { Component } from '@angular/core';
import {IndicatorService} from "../../services/indicator.service";
import {IIndicator, IIndicatorEntry} from "../../interfaces/indicators.interface";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  currentSetting: string = "202405-1622-2128-85e71527-8fbf-4889-baa1-3ff5ad6194ec";
  constructor(private indicatorService: IndicatorService) {
  }
  indicatorsAvailable: IIndicatorEntry[] = []
  currentIndicators!: IIndicatorEntry | undefined;
  ngOnInit(){
    this.indicatorService.getAllPromptEntryData().subscribe(items => {
      console.log(items)
      this.indicatorsAvailable = items;
      this.currentIndicators =  this.indicatorsAvailable.find(element =>
        element.id == this.currentSetting)
    }, error => {
      console.log(error)
    })
  }

  changeSetting() {
    console.log(this.currentSetting)
    this.currentIndicators =  this.indicatorsAvailable.find(element =>
      element.id == this.currentSetting)
  }
}
