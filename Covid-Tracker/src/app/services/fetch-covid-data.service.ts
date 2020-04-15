import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchCovidDataService {

  public apiData = [];
  public filteredApiData = [];
  public indianDemographicsArray = [];
  public confirmed = 0;
  public recovered = 0;
  public deaths = 0;
  public dataUpdatedDate = '';

  constructor(private http:HttpClient) { 
    this.geIndiaTestsData();
    this.getIndiaStateWiseData();
  }

  getUpdatedCovidData() {
  from(fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json()))
  .subscribe(log => {
    this.apiData.push(log);
    // console.log(this.apiData);
    this.transformApiResponseData();
  })
  };

  geIndiaTestsData() {
    return this.http.get('https://api.covid19india.org/data.json');
  }

  getIndiaStateWiseData() {
    this.http.get('https://api.covid19india.org/state_district_wise.json').subscribe(data => {
      console.log(data);
    })
  }

  transformApiResponseData() {
    this.apiData.forEach(data => {
      Object.keys(data).forEach(globalData => {
        this.filteredApiData.push(data[globalData])
      });
      data['India'].forEach(element => {
        this.indianDemographicsArray.push(element);
      });
    });
    this.globalCases();
  }

  globalCases() {
    this.filteredApiData.forEach(countryWiseData => {
      let length = countryWiseData.length;
      countryWiseData.forEach((cases,index) => {
        if(index === length - 1) {
          this.confirmed = this.confirmed + cases.confirmed;
          this.recovered = this.recovered + cases.recovered;
          this.deaths = this.deaths + cases.deaths;
          this.dataUpdatedDate = cases.date;
        }
      })
    })
  };

  getIndianDemographics() {
    if(this.indianDemographicsArray.length > 1) {
      return of(this.indianDemographicsArray);
    }
  }

  getNumberCardsData() {
    if(this.confirmed > 0) {
      return { 'confirmed': this.confirmed,
               'recovered': this.recovered,
               'deaths': this.deaths }
    }
  }

  getUpdatedDate() {
    if(this.dataUpdatedDate.length > 1) {
      return of(this.dataUpdatedDate);
    }
  }
}
