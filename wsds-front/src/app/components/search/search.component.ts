import {Component} from '@angular/core';
import {GemmaService} from '../../services/gemma.service';
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

interface OnInit {
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  myControl = new FormControl('');
  townsControl = new FormControl('')
  departmentsControl = new FormControl('');
  results: any[] = [];
  options: string[] = ['Homicidio', 'Feminicidio', 'Asesinato'];
  departments = [
    { name: 'Ahuachapán', towns: ['Ahuachapán Norte', 'Ahuachapán Centro', 'Ahuachapán Sur'] },
    { name: 'San Salvador', towns: ['San Salvador Norte', 'San Salvador Oeste', 'San Salvador Este', 'San Salvador Centro', 'San Salvador Sur'] },
    { name: 'La Libertad', towns: ['La Libertad Norte', 'La Libertad Centro', 'La Libertad Oeste', 'La Libertad Este', 'La Libertad Costa', 'La Libertad Sur'] },
    { name: 'Chalatenango', towns: ['Chalatenango Norte', 'Chalatenango Centro', 'Chalatenango Sur'] },
    { name: 'Cuscatlán', towns: ['Cuscatlán Norte', 'Cuscatlán Sur'] },
    { name: 'Cabañas', towns: ['Cabañas Este', 'Cabañas Oeste'] },
    { name: 'La Paz', towns: ['La Paz Oeste', 'La Paz Centro', 'La Paz Este'] },
    { name: 'La Unión', towns: ['La Unión Norte', 'La Unión Sur'] },
    { name: 'Usulután', towns: ['Usulután Norte', 'Usulután Este', 'Usulután Oeste'] },
    { name: 'Sonsonate', towns: ['Sonsonate Norte', 'Sonsonate Centro', 'Sonsonate Este', 'Sonsonate Oeste'] },
    { name: 'Santa Ana', towns: ['Santa Ana Norte', 'Santa Ana Centro', 'Santa Ana Este', 'Santa Ana Oeste'] },
    { name: 'San Vicente', towns: ['San Vicente Norte', 'San Vicente Sur'] },
    { name: 'San Miguel', towns: ['San Miguel Norte', 'San Miguel Centro', 'San Miguel Oeste'] },
    { name: 'Morazán', towns: ['Morazán Norte', 'Morazán Sur'] }
  ];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsDepartments: Observable<string[]> | undefined;
  filteredOptionsTowns: Observable<string[]> | undefined;
  currentDepartment: {name: string, towns: string[]} | null | undefined = null;
  indicators = [
    "Víctima",
    "Agresor/a",
    "Edad de la víctima y del agresor",
    "Hechos vulneratorios",
    "Contexto del hecho",
    "Lugar del hecho",
    "Arma",
    "Estado del agresor/a después del hecho",
    "Homicidios sin contextos"
  ];

  constructor(private gemmaService: GemmaService) { }
  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptionsDepartments = this.departmentsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartments(value || '')),
    );
    this.departmentsControl.valueChanges.subscribe(value => {
      this.currentDepartment = this.departments.find(obj => obj.name == value)
      console.log(this.currentDepartment)
    })
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.gemmaService.searchData(this.searchTerm.trim()).subscribe(
        data => {
          console.log(data)
          if (Array.isArray(data)) {
            this.results = data;
          } else if (data && typeof data === 'object') {
            this.results = [data];
            console.log(this.results)
          } else {
            this.results = [];
          }
        },
        error => {
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

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDepartments(value: string): string[]  {
    const filterValue = value.toLowerCase();
    return this.departments.filter(option => option.name.toLowerCase().includes(filterValue)).map(el => el.name);
  }

  changeDepartments($event: Event) {
    console.log(this.departmentsControl.value)
  }
}
