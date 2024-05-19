import { Component } from '@angular/core';
import {IndicatorService} from "../../services/indicator.service";
import {IIndicatorEntry} from "../../interfaces/indicators.interface";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  currentSetting: string = "1";
  constructor(private indicatorService: IndicatorService) {
  }
  indicatorsAvailable: IIndicatorEntry[] = []
  ngOnInit(){
    this.indicatorService.getAllPromptEntryData().subscribe(items => {
      this.indicatorsAvailable = items;
    }, error => {
      console.log(error)
    })
  }
}
