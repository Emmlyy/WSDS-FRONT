import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { BannerComponent } from './components/Banner/banner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {HttpConfigInterceptor} from "./interceptor/http-config.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BannerComponent,
    NavBarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
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
    MatCardModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
