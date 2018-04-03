import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { NavComponent } from '../../commons/nav/nav.component';
import { HeaderComponent } from '../../commons/header/header.component';
import { FooterComponent } from '../../commons/footer/footer.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { User } from '../../models/index';
import { Store } from '../../models/index';
import { StoresService } from '../../services/stores/index';
import { UserService, AlertService } from '../../services/auth/index';
import 'rxjs/add/operator/switchMap';

interface StoreConfig<T, X, Y, Z> {
  stores: Store[];
  store: Store;
  model: Object;
  loading: boolean;
  data: Object
  error: string;
  getCurrentUser(): User;
  getMessage(): string;
  getShow(): boolean;
}
@Component({
  moduleId: module.id,
  selector: 'app-store',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements StoreConfig<User, Store[], boolean, string>, OnInit {

  private currentUser;
  private message;
  private show;
  public loading;
  public model: any = {};
  public stores;
  public store;
  public data;
  public error;

  constructor(
    private userService: UserService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private http: Http,
    private alertService: AlertService
  ) {
    this.getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getMessage() {
    return this.message;
  }

  public getShow() {
    return this.show;
  }

  private getStoreById(): {} {
    return this.route.params
      .switchMap(params => this.storesService.getById(params.id))
      .subscribe(store => (this.store = store));
  }

  private updateStore(store: Store): void {
    this.loading = true;

    this.fileChangeChecker();

    this.storesService.update(this.model).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/stores']);
        this.loadAllStores();
      },
      error => {
        this.error = 'Error on updating the store.';
        this.loading = false;
      }
    );
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
      this.getStoreById();
      this.model.store_file = this.store.store_file;
      this.model.store_path = './assets/images/store/';
    }
  }

  private getUserInfo(): {} {
    return this.userService.getUserInfo().subscribe(message => {
      this.getMessage = message;
    });
  }

  private loadAllStores(): {} {
    return this.storesService.getStores().subscribe(data => {
      this.data = data;
    });
  }

  private queryRouteParameters(): void {
    this.model._id = this.route.snapshot.params['id'];
    this.model.store_image = this.route.snapshot.params['store_image'];
    this.model.store_file = this.route.snapshot.params['store_file'];
    this.model.store_path = this.route.snapshot.params['store_path'];
    this.model.store_phone = this.route.snapshot.params['store_phone'];
    this.model.store_country = this.route.snapshot.params['store_country'];
    this.model.store_city = this.route.snapshot.params['store_city'];
    this.model.store_type = this.route.snapshot.params['store_type'];
    this.model.store_address = this.route.snapshot.params['store_address'];
    this.model.updated_at = new Date();
  }

  ngOnInit() {
    this.loadAllStores();
    this.getUserInfo();
    this.getStoreById();
    this.queryRouteParameters();
  }
}
