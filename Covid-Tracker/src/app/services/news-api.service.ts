import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {


  api_key = '509d10baa35a4e34891d02bb58637159';

  constructor(private http:HttpClient) { }

  initSources(){
     return this.http.get('http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey='+this.api_key);
  }

  initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }

  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }

}
