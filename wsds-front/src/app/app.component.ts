import { Component } from '@angular/core';
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wsds-front';
  loading = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
}
