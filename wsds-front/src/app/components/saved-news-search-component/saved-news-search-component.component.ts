import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { INews, ISavedNews } from '../../interfaces/news.interface';
import { MatDialog } from '@angular/material/dialog';
import { SheetModalComponent } from '../sheet-modal/sheet-modal.component';
@Component({
  selector: 'app-saved-news-search-component',
  templateUrl: './saved-news-search-component.component.html',
  styleUrl: './saved-news-search-component.component.scss',
})
export class SavedNewsSearchComponentComponent {
  searchControl = new FormControl('');
  townsControl = new FormControl('');
  departmentsControl = new FormControl('');
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
  news: ISavedNews[] | undefined = [];

  constructor(private gemmaService: GemmaService, public dialog: MatDialog) {}
  ngOnInit() {
    this.gemmaService.getAllNews().subscribe((items) => (this.news = items));
  }
  onSearch(): void {
    if (this.searchControl.value) {
      this.gemmaService.getNews(this.searchControl.value).subscribe(
        (data) => {
          this.news = data;
        },
        (error) => {
          console.error('Error al obtener datos:', error);
          this.results = [];
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
