import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StoresType } from '../../models/storesType';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoresTypeService {
  private stores: StoresType;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // tslint:disable-next-line:no-inferrable-types
  private api: string = '../../../assets/services/stores.json';

  constructor(private http: Http) {}

  public getStores(): Promise<StoresType[]> {
    return this.http
      .get(this.api)
      .toPromise()
      .then(response => response.json() as StoresType[]);
  }
}
