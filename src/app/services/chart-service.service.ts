import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
   url = 'assets/Json/shortdata.json';
  constructor(private httpClient: HttpClient) { }

  getChartData(){
    return this.httpClient.get(this.url);
  }
}
