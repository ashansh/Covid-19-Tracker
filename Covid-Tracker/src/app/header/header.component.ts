import { Component, OnInit } from '@angular/core';
import { FetchCovidDataService } from '../services/fetch-covid-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public updatedDate = '';

  constructor(private fetchService: FetchCovidDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.fetchService.getUpdatedDate().subscribe(date => {
        if(date.length > 1) {
          this.updatedDate = date;
        }
      })
    }, 1500)
  }
}
