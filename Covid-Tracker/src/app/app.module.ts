import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsSectionComponent } from './news-section/news-section.component';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { AnalyticalChartsComponent } from './analytical-charts/analytical-charts.component';
import { IndiaDemographicsComponent } from './india-demographics/india-demographics.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrendModule } from 'ngx-trend';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTableModule} from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsSectionComponent,
    NumberCardsComponent,
    AnalyticalChartsComponent,
    IndiaDemographicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TrendModule,
    NgxSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
