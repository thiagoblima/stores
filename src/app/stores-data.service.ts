import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoresDataService {

  constructor(private http: Http) { }

  data : Array<any> = [];

  public getStores(){

    this.http.get('./src/app/stores.json')
      .map(res => res.json())
      .subscribe(res => this.data = res);

  }

}
