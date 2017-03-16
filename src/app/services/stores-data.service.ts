import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoresDataService {

  private stores: Array <string>;
  private api: string = './src/app/stores.json';

  constructor(private http: Http) {
    this.stores;
  }

  public getStores() {

    return this.http.get(this.api)
      .toPromise()
      .then(response => response.json() as Array <string>)

  }

}