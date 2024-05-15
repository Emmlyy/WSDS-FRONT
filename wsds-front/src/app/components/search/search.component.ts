import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import global from './../../mocks/global';
import { HttpEventType } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
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
  options: string[] = ['Homicidio', 'Feminicidio', 'Asesinato'];
  departments = [
    {
      name: 'Ahuachapán',
      towns: ['Ahuachapán Norte', 'Ahuachapán Centro', 'Ahuachapán Sur'],
    },
    {
      name: 'San Salvador',
      towns: [
        'San Salvador Norte',
        'San Salvador Oeste',
        'San Salvador Este',
        'San Salvador Centro',
        'San Salvador Sur',
      ],
    },
    {
      name: 'La Libertad',
      towns: [
        'La Libertad Norte',
        'La Libertad Centro',
        'La Libertad Oeste',
        'La Libertad Este',
        'La Libertad Costa',
        'La Libertad Sur',
      ],
    },
    {
      name: 'Chalatenango',
      towns: ['Chalatenango Norte', 'Chalatenango Centro', 'Chalatenango Sur'],
    },
    { name: 'Cuscatlán', towns: ['Cuscatlán Norte', 'Cuscatlán Sur'] },
    { name: 'Cabañas', towns: ['Cabañas Este', 'Cabañas Oeste'] },
    { name: 'La Paz', towns: ['La Paz Oeste', 'La Paz Centro', 'La Paz Este'] },
    { name: 'La Unión', towns: ['La Unión Norte', 'La Unión Sur'] },
    {
      name: 'Usulután',
      towns: ['Usulután Norte', 'Usulután Este', 'Usulután Oeste'],
    },
    {
      name: 'Sonsonate',
      towns: [
        'Sonsonate Norte',
        'Sonsonate Centro',
        'Sonsonate Este',
        'Sonsonate Oeste',
      ],
    },
    {
      name: 'Santa Ana',
      towns: [
        'Santa Ana Norte',
        'Santa Ana Centro',
        'Santa Ana Este',
        'Santa Ana Oeste',
      ],
    },
    { name: 'San Vicente', towns: ['San Vicente Norte', 'San Vicente Sur'] },
    {
      name: 'San Miguel',
      towns: ['San Miguel Norte', 'San Miguel Centro', 'San Miguel Oeste'],
    },
    { name: 'Morazán', towns: ['Morazán Norte', 'Morazán Sur'] },
  ];
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
  panelOpenState: boolean = false;
  iconMapper = new Map([
    ['diario.elmundo.sv', './../../assets/elmundo.png'],
    ['diariocolatino.com', './../../assets/colatino.png'],
    ['diarioelsalvador.com', './../../assets/elsalvador.png'],
  ]);
  news:
    | {
        title: string;
        text: string;
        source: string;
        sheet: {
          priority: number;
        };
        tag: string;
        url: string;
        sheet_id: string;
        date: string;
      }[]
    | null
    | undefined = null;

  constructor(
    private gemmaService: GemmaService,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsDepartments = this.departmentsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDepartments(value || ''))
    );
    this.departmentsControl.valueChanges.subscribe((value) => {
      this.currentDepartment = this.departments.find(
        (obj) => obj.name == value
      );
      console.log(this.currentDepartment);
    });
  }
  onSearch(): void {
    if (this.searchControl.value) {
      let current_text = '';
      this.gemmaService.searchData(this.searchControl.value).subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.loaderInServices = false;
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

  private _filterDepartments(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departments
      .filter((option) => option.name.toLowerCase().includes(filterValue))
      .map((el) => el.name);
  }
  changeDepartments($event: Event) {
    console.log(this.departmentsControl.value);
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
