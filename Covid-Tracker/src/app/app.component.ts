import { Component } from '@angular/core';
import { FetchCovidDataService } from './services/fetch-covid-data.service';
import { NewsApiService } from './services/news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid-Tracker';

  constructor(dataService: FetchCovidDataService, newsService: NewsApiService) {
    dataService.getUpdatedCovidData();
    // newsService.initSources().subscribe(data => {
    //   console.log('news', data);
    // })
  }
}
