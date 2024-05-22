import {ChangeDetectorRef, Component} from '@angular/core';
import {LoaderService} from "./services/loader.service";
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wsds-front';
  loading = this.loaderService.isLoading;
  currentMessage = ""
  /*messages = ['Buscando noticias...'];
  currentMessage$ = interval(3000).pipe(
    map(i => this.messages[i % this.messages.length])
  );*/
  constructor(private loaderService: LoaderService, private cdref: ChangeDetectorRef) {}

  ngOnInit(){
    this.loaderService.message.subscribe(val =>{
      this.currentMessage = val
    })
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
