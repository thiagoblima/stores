import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoresDataService {

  private stores: Array <any>;

  constructor(private http: Http) { 
     this.stores;
  }

  public getStores(){

    this.http.get('./src/app/stores.json')
      .map(res => res.json())
      .subscribe(res => this.stores = res);

  }

}
