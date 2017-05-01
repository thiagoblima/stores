import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StoresData } from '../../models/stores';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoresDataService {

  private stores: StoresData;
  private headers = new Headers({'Content-Type': 'application/json'});
  private api: string = '../../../assets/services/stores.json';

  constructor(private http: Http) {
    this.stores;
  }

  public getStores(): Promise <StoresData[]> {

    return this.http.get(this.api)
      .toPromise()
      .then(response => response.json() as StoresData[])

  }

}