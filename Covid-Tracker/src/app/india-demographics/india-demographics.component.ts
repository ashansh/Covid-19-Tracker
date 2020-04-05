import { Component, OnInit } from '@angular/core';
import { FetchCovidDataService } from '../services/fetch-covid-data.service';

@Component({
  selector: 'app-india-demographics',
  templateUrl: './india-demographics.component.html',
  styleUrls: ['./india-demographics.component.css']
})
export class IndiaDemographicsComponent implements OnInit {

  public indiaUpdate : any;
  public totalInfectedCases: number;
  public totalRecoveredCases: number;
  public totalDeaths: number;
  public totalActiveCases: number;
  public latestPositiveCases: number;
  public latestRecoveredCases: number;
  public latestDeaths: number;
  public latestActive: number;
  public showTrendsArray = false;

  public confirmedArray = [];
  public recoveredArray = [];
  public deathsArray = [];
  public activeCasesArray = [];

  constructor(private fetchService: FetchCovidDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.fetchService.getIndianDemographics().subscribe(data => {
        if(data) {
          this.indiaUpdate = data;
          this.createTrendsArray();
          let length = this.indiaUpdate.length - 1;
          let lastInfected;
          let lastRecovered;
          let lastDeaths;
          let lastActive;
          this.indiaUpdate.forEach((element, index) => {
            if(length === index) {
              this.totalInfectedCases = element.confirmed;
              this.totalRecoveredCases = element.recovered;
              this.totalDeaths = element.deaths;
              this.totalActiveCases = this.totalInfectedCases - this.totalRecoveredCases - this.totalDeaths;
              this.latestPositiveCases = this.totalInfectedCases - lastInfected;
              this.latestRecoveredCases = this.totalRecoveredCases - lastRecovered;
              this.latestDeaths = this.totalDeaths - lastDeaths;
              this.latestActive = this.totalActiveCases - lastActive;
            }
            if(index === length -1) {
              lastInfected = element.confirmed;
              lastRecovered = element.recovered;
              lastDeaths = element.deaths;
              lastActive = lastInfected - lastRecovered - lastDeaths;
            }
          });
        };
      })
    }, 1500);
  }

  createTrendsArray() {
    this.indiaUpdate.forEach(element => {
      if(element.confirmed > 0) {
        this.confirmedArray.push(element.confirmed);
      }
      if(element.recovered > 0) {
        this.recoveredArray.push(element.recovered);
      }
       if(element.deaths > 0) {
         this.deathsArray.push(element.deaths)
         let activeList = element.confirmed - element.recovered - element.deaths;
         this.activeCasesArray.push(activeList);
       }
    });
    this.confirmedArray = [...new Set(this.confirmedArray)];
    this.recoveredArray = [...new Set(this.recoveredArray)];
    this.deathsArray = [...new Set(this.deathsArray)];
    this.activeCasesArray = [...new Set(this.activeCasesArray)];
    this.showTrendsArray = true;
  }
}
