import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';
import { map, Observable, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SheetModalComponent } from '../sheet-modal/sheet-modal.component';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {INews, ISavedNews, ISheet} from "../../interfaces/news.interface";
import {IPrompts} from "../../interfaces/indicators.interface";
@Component({
  selector: 'app-saved-news-search-component',
  templateUrl: './saved-news-search-component.component.html',
  styleUrl: './saved-news-search-component.component.scss',
})
export class SavedNewsSearchComponentComponent {
  results: any[] = [];
  advFilters!: FormGroup;
  options: string[] = ['Homicidio', 'Feminicidio', 'Asesinato'];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsDepartments: Observable<string[]> | undefined;
  filteredOptionsTowns: Observable<string[]> | undefined;
  currentDepartment: { name: string; towns: string[] } | null | undefined =
    null;
  indicators: IPrompts[] = []
  date_start: string = "";
  date_end: string = "";
  panelOpenState: boolean = false;
  iconMapper = new Map([
    ['diario.elmundo.sv', './../../assets/elmundo.png'],
    ['diariocolatino.com', './../../assets/colatino.png'],
    ['diarioelsalvador.com', './../../assets/elsalvador.png'],
  ]);
  news: ISavedNews[] | null = [];
  get searchControl_() {
    return this.advFilters.get('searchControl') as FormControl;
  }

  constructor(private gemmaService: GemmaService, private fb: FormBuilder, public dialog: MatDialog) {}
  get dateStart() {
    return this.advFilters.get('dateStart') as FormControl;
  }

  get dateEnd() {
    return this.advFilters.get('dateEnd') as FormControl;
  }

  get advFilters_() {
    return this.advFilters.get('inputs') as FormArray;
  }
  ngOnInit() {
    this.advFilters = this.fb.group({
      inputs: this.fb.array( this.indicators.map(() => this.fb.control(''))),
      searchControl: [''],
      dateStart: [''],
      dateEnd: [''],
    });
    this.gemmaService.getAllNews().subscribe(items => {
      this.news = (items)
      this.gemmaService.getIndicators().subscribe(items => {
        this.indicators = (items)
        console.log(this.indicators)
        this.advFilters.setControl("inputs", this.fb.array( this.indicators.map(() => this.fb.control(''))))
      })
    })
  }

  onSearch(): void {
    console.log()
    const indicators_local: { indicator_name: string, response: string } [] = []
    for (const [index, element] of this.advFilters_.value.entries()) {
      const obj = {
        indicator_name : this.indicators[index].indicator_name,
        response: element
      }
      indicators_local.push(obj)
    }
    const filters_sheet: ISheet = {
      indicators: indicators_local,
      id: "",
      priority: 0
    }
    const date_start = this.dateStart.value !== null ? this.dateStart.value  : ""
    const date_end =  this.dateEnd.value !== null ? this.dateEnd.value : ""
    this.gemmaService.getFilteredNews(this.searchControl_.value, filters_sheet, date_start, date_end)
      .subscribe(items => this.news = (items))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  openDialogModifySheet(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    newSaved: ISavedNews
  ) {
    this.dialog.open(SheetModalComponent, {
      data: { newSaved },
      width: '60vw',
      height: '60vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
