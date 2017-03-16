import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class StoresDataService {

  constructor(private http: Http) { }

  private getStores(){

    return this.http.get('app/cities.json')    
      .map(res => res.json())
      .subscribe(res => console.log(res, "Subscribe Response"))
      
  }

}
