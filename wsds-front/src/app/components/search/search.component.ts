import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import global from './../../mocks/global';
import { HttpEventType } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import {ISavedNews} from "../../interfaces/news.interface";
import {SheetModalComponent} from "../sheet-modal/sheet-modal.component";
import {ReadNewComponent} from "../read-new/read-new.component";
interface OnInit {}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  //YourDialog: '../Ficha/ficha.component.html'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  townsControl = new FormControl('');
  departmentsControl = new FormControl('');
  loaderInServices = false;
  results: any[] = [];
  date_start: string = "";
  date_end: string = "";
  indicatorsSet: number = 10;
  options: string[] = ['Homicidio', 'Feminicidio', 'Asesinato'];
  totalResults = 0;
  totalPages = 0
  arrayPaginator:number[] = []
  arraySearchOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsDepartments: Observable<string[]> | undefined;
  filteredOptionsTowns: Observable<string[]> | undefined;
  currentDepartment: { name: string; towns: string[] } | null | undefined =
    null;
  indicators = [
    'Víctima',
    'Agresor/a',
    'Edad de la víctima y del agresor',
    'Hechos vulneratorios',
    'Contexto del hecho',
    'Lugar del hecho',
    'Arma',
    'Estado del agresor/a después del hecho',
    'Homicidios sin contextos',
  ];
  highPerformance: string = "standard";
  iconMapper = new Map([
    ['diario.elmundo.sv', './../../assets/elmundo.png'],
    ['diariocolatino.com', './../../assets/colatino.png'],
    ['diarioelsalvador.com', './../../assets/elsalvador.png'],
  ]);
  news!: ISavedNews[];
  currentPage: number = 1;

  constructor(
    private gemmaService: GemmaService,
    private loaderService: LoaderService,
    public dialog: MatDialog
  ) {}


  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

  }
  onSearch(start_from = 0): void {
    if (this.searchControl.value) {
      let current_text = '';
      this.gemmaService.searchData(this.searchControl.value, this.date_start, this.date_end, this.highPerformance,this.indicatorsSet, start_from).subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.loaderInServices = false;
            this.gemmaService.getTotalResults(String(this.searchControl.value), this.date_start, this.date_end, this.highPerformance,this.indicatorsSet, start_from).subscribe(total => {
              this.totalResults = Math.min(total, 90)
              this.totalPages = Math.ceil(this.totalResults / 10)
              this.arrayPaginator = Array.from({ length: this.totalPages }, (_, i) => i + 1);
            })
          } else if (event.type === HttpEventType.DownloadProgress) {
            if (
              event.partialText.includes('data: True') &&
              !this.loaderInServices
            ) {
              this.loaderService.hide();
              this.loaderInServices = true;
            } else {
              let res = event.partialText;
              res = res.substring(current_text.length);
              const obj = JSON.parse(res.substring(res.indexOf('[')));
              current_text = event.partialText;
              this.news = obj;
              console.log('dd', this.news);
            }
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      this.results = [];
    }

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

  changeDepartments($event: Event) {
    console.log(this.departmentsControl.value);
  }

  openDialogReadNew(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    newSaved: ISavedNews
  ) {
    this.dialog.open(ReadNewComponent, {
      data: { newSaved },
      width: '60vw',
      height: '60vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  requestNewPaginationData(i: number) {
    this.currentPage = i;
    this.onSearch((i-1)*this.indicatorsSet)
  }
}

/*
@Component({
  selector: '../Ficha/ficha.component',
  templateUrl: '../Ficha/ficha.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class FichaComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FichaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}*/
