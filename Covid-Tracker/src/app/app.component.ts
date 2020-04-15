import { Component } from '@angular/core';
import { FetchCovidDataService } from './services/fetch-covid-data.service';
import { NewsApiService } from './services/news-api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid-Tracker';

  constructor(dataService: FetchCovidDataService, newsService: NewsApiService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    dataService.getUpdatedCovidData();
    // newsService.initSources().subscribe(data => {
    //   console.log('news', data);
    // })
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
