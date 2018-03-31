import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { Store } from '../models/index';
import { UserService, AlertService } from '../services/auth/index';
import { StoresService } from '../services/stores/index';

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

export class StoresComponent implements OnInit {

  // tslint:disable:no-inferrable-types
  private currentUser: User;
  public stores: Store[] = [];
  public store: Store;
  public message: string = '';
  public model: any = {};
  public loading: boolean = false;
  public error: string = '';
  public show: boolean = false;

  constructor(
    private router: Router,
    private storesService: StoresService,
    private userService: UserService,
    private alertService: AlertService,
    private http: Http
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
      error => {
        this.error = 'Error on creating a new store.';
        this.loading = false;
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
      this.message = message;
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

  ngOnInit() {
    this.loadAllStores();
    this.getUserInfo();
  }
}
