import { FetchCovidDataService } from './../services/fetch-covid-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.css']
})
export class NumberCardsComponent implements OnInit {

  public numberData: any = [{"name": "Worldwide Confirmed Cases", "value": 0}, 
  {"name": "Worldwide Recovered Cases", "value": 0},
  {"name": "Worldwide deaths", "value": 0}];
  public showCards = false;
  public view = [700, 400];
  public colorScheme = {
    domain: ['#cc0000', '#32cd32', '#CFC0BB']
  };
  public cardColor: string = '#232837';

  constructor(private fetchService: FetchCovidDataService) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.view = [];
      let serviceResponse = this.fetchService.getNumberCardsData();
      this.numberData[0].value = serviceResponse.confirmed;
      this.numberData[1].value = serviceResponse.recovered
      this.numberData[2].value = serviceResponse.deaths;
      this.showCards = true;
      this.view.push(300,300);
    }, 2000)
  }
}
