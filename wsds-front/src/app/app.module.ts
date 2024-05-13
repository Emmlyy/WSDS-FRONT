import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { BannerComponent } from './components/Banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import {
  ButtonReportComponent,
  FichaContentDialog,
  DialogContentFicha,
  NewsDetailsComponent,
} from './components/Ficha/ficha.component';
import {
  ButtonReadComponent,
  NewsContentDialog,
  DialogContentNews,
} from './components/News/news.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';

import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { HttpConfigInterceptor } from './interceptor/http-config.interceptor';
import { SavedNewsSearchComponentComponent } from './components/saved-news-search-component/saved-news-search-component.component';
import { RouterModule, Routes } from '@angular/router';
import {IndicadoresComponent, ButtonNewPromptComponent, NewContentDialog, DialogContentNew, NewIndicadorComponent} from './components/Indicadores/prompt.component';
import {MatDialogModule } from '@angular/material/dialog';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

const routes: Routes = [
  {
    path: 'Noticias-Guardadas',
    component: SavedNewsSearchComponentComponent,
  },
  {
    path: 'Buscar-Noticias',
    component: SearchComponent,
  },
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'Indicadores',
    component: IndicadoresComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MatDialogModule,
    SearchComponent,
    BannerComponent,
    NavBarComponent,
    LayoutComponent,
    ButtonReportComponent,
    ButtonReadComponent,
    ButtonNewPromptComponent,
    NewsDetailsComponent,
    SavedNewsSearchComponentComponent,
    IndicadoresComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDateRangePicker,
    MatSlideToggle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionModule,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    DialogContentFicha,
    FichaContentDialog,
    DialogContentNews,
    NewsContentDialog,
    NewContentDialog,
    DialogContentNew,
    NewIndicadorComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
