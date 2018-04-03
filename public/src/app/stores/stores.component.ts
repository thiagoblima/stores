import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { Store } from '../models/index';
import { UserService, AlertService } from '../services/auth/index';
import { StoresService } from '../services/stores/index';

interface StoreConfig <T, X, Y, Z> {
  stores: Store[];
  store: Store;
  model: Object;
  loading: boolean;
  error: string;
  storeHeader: { title: string };
  getCurrentUser(): User;
  getShow(): boolean;
  getMessage(): string;
}

interface ErrorConfig<T, X, Y> {
  success: boolean;
  msg: string;
  err: {
    name: string,
    message: string,
    ok: number,
    errmsg: string,
    code: number,
    codeName: string
  }
}
@Component({
  moduleId: module.id,
  selector: 'app-stores',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})

export class StoresComponent implements StoreConfig<User, Store[], boolean, string>, OnInit {

  private currentUser;
  private show;
  private message;
  public stores;
  public store;
  public model: any = {};
  public storeHeader = { title: 'Store Manager' };
  public loading;
  public error;

  constructor(
    private router: Router,
    private storesService: StoresService,
    private userService: UserService,
    private alertService: AlertService,
    private http: Http
  ) {
    this.getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

 public createStore(store: Store): void {
    this.loading = true;
    this.fileChangeChecker();

    this.storesService.createStore(this.model).subscribe(
      data => {
        this.alertService.success('Creation successful', true);
        this.router.navigate(['/stores']);
        this.loadAllStores();
        this.loading = false;
        this.model = {};
      },
      err => {
        let serverError: ErrorConfig<boolean, string, { string, number }> = JSON.parse(err._body);
        this.error = 'An error occured: ' + `${serverError.msg}`
        this.loading = false;
        console.warn('Update user debug: ', serverError);
      }
    );
  }

  deleteStore(_id: number): {} {
    return this.storesService.delete(_id).subscribe(() => {
      this.loadAllStores();
    });
  }

  private loadAllStores(): {} {
    return this.storesService.getStores().subscribe(stores => {
      this.stores = stores;
    });
  }

  private getUserInfo(): {} {
    return this.userService.getUserInfo().subscribe(message => {
      this.getMessage = message;
    });
  }

  fileChange(event): void {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      let formData: FormData = new FormData();

      formData.append('file', file, file.name);

      this.model.store_file = file.name;
      this.model.store_path = './assets/images/store/';

      this.storesService.fileChange(formData).subscribe(
        data => {
          console.log('success on saving new photo', data);
        },
        error => {
          console.log('an error ocurred while saving a new photo', error);
        }
      );
    }
  }

  private fileChangeChecker(): void {
    if (!this.model.store_file) {
      this.model.store_file = 'default.png';
      this.model.store_path = './assets/images/store/';
    }
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getShow() {
    return this.show;
  }

  public getMessage() {
    return this.message;
  }

  ngOnInit() {
    this.loadAllStores();
    this.getUserInfo();
  }
}
