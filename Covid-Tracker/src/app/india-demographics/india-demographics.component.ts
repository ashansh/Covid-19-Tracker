import { Component, OnInit } from '@angular/core';
import { FetchCovidDataService } from '../services/fetch-covid-data.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-india-demographics',
  templateUrl: './india-demographics.component.html',
  styleUrls: ['./india-demographics.component.css']
})

export class IndiaDemographicsComponent implements OnInit {

  public indiaGlobalApiUpdate : any;
  public indiaLocalApiUpdate: any;
  public lastIndiaDataUpdateTime: string = null;
  public totalInfectedCases: number;
  public totalRecoveredCases: number;
  public totalDeaths: number;
  public totalActiveCases: number;
  public latestPositiveCases: number;
  public latestRecoveredCases: number;
  public latestDeaths: number;
  public latestActive: number;
  public showTrendsArray = false;
  public showStateWiseDataTable = false;
  public sourceLink = '';

  public confirmedArray = [];
  public recoveredArray = [];
  public deathsArray = [];
  public activeCasesArray = [];
  public stateWiseCasesArray: any = [];
  public samplesTestedArray : any = [];
  public stateWisDisplayedColumns: string[] = ['state', 'confirmed', 'recovered', 'deaths'];
  public testAnalysisColumns: string[] = ['Overall Samples Tested', 'Tests Today', 'Last Updated'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stateWiseCasesArray.filter = filterValue.trim().toLowerCase();
  }

  constructor(private fetchService: FetchCovidDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.fetchService.getIndianDemographics().subscribe(data => {
        if(data) {
          this.indiaGlobalApiUpdate = data;
          this.createTrendsArray();
          let length = this.indiaGlobalApiUpdate.length - 1;
          let lastInfected;
          let lastRecovered;
          let lastDeaths;
          let lastActive;
          this.indiaGlobalApiUpdate.forEach((element, index) => {
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
    }, 2000);
    this.getIndiaData();
  }

  getIndiaData() {
    this.fetchService.geIndiaTestsData().subscribe((data: any) => {
      if(data) {
        this.indiaLocalApiUpdate = data;
        console.log('dfg',this.indiaLocalApiUpdate)
        this.lastIndiaDataUpdateTime = this.formatDate(data.statewise[0].lastupdatedtime);
        data.statewise.splice(0,1);
        data.tested.forEach((tests,index) => {
          if(data.tested.length === index + 1) {
            tests.updatetimestamp = this.formatDate(tests.updatetimestamp);
            this.samplesTestedArray.push(tests);
            this.sourceLink = tests.source.toLowerCase().includes('icmr') ? 'ICMR' : 'Unknown';
          }
        });
        this.showStateWiseDataTable = true;
        this.stateWiseCasesArray = new MatTableDataSource(data.statewise);
      }
    })
  }

  formatDate(date) {
    const day = date.substring(0,2);
    const month = date.substring(3,5);
    const year = date.substring(5);
    const newDate = month + '/' + day + year;
    return newDate;
  }

  createTrendsArray() {
    this.indiaGlobalApiUpdate.forEach(element => {
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
