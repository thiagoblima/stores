import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { StoresType } from '../../models/index';

@Injectable()
export class StoresService {
    constructor(private http: Http) { }

    getStores() {
        return this.http.get('/api/stores', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: any) {
        return this.http.get('/api/store/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    update(store: StoresType) {
        return this.http.put('/api/user/' + store._id, store, this.jwt()).map((response: Response) => response.json());
    }

    delete(_id: number) {
        return this.http.delete('/api/store/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}