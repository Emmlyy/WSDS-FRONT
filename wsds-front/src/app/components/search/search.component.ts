import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  results: any[] = [];

  constructor(private gemmaService: GemmaService) { }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.gemmaService.searchData(this.searchTerm.trim()).subscribe(
        data => {
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
}
