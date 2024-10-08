import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { BannerComponent } from './components/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
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
import {NgOptimizedImage} from "@angular/common";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import { SheetModalComponent } from './components/sheet-modal/sheet-modal.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { IndicatorModalComponent } from './components/indicator-modal/indicator-modal.component';
import { CreateIndicatorModalComponent } from './components/create-indicator-modal/create-indicator-modal.component';
import { ReadNewComponent } from './components/read-new/read-new.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";



const routes: Routes = [
  {
    path: 'archivo',
    component: SavedNewsSearchComponentComponent,
  },
  {
    path: 'busqueda',
    component: SearchComponent,
  },
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'indicadores',
    component: IndicatorsComponent,
  },
  {
    path: 'acerca-de',
    component: BannerComponent,
  },
  {
    path: 'instrucciones',
    component: InstructionsComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BannerComponent,
    NavBarComponent,
    LayoutComponent,
    SavedNewsSearchComponentComponent,
    SheetModalComponent,
    MessageDialogComponent,
    IndicatorsComponent,
    IndicatorModalComponent,
    CreateIndicatorModalComponent,
    ReadNewComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule,
    MatFormField,
    MatDialogModule,
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
    NgOptimizedImage,
    MatSelect,
    MatSelectTrigger,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgxExtendedPdfViewerModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
