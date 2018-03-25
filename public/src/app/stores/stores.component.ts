import {
  Component,
  NgModule,
  OnInit,
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/core';
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
  public message: string = '';
  public model: any = {};
  public loading: boolean = false;
  public error: string = '';
  public show: boolean = false;
  private apiEndPoint: string = 'api/upload/store/asset';

  constructor(
    private router: Router,
    private storesService: StoresService,
    private userService: UserService,
    private alertService: AlertService,
    private http: Http
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  createStore() {
    this.loading = true;
    this.storesService.createStore(this.model).subscribe(
      data => {
        this.alertService.success('Creation successful', true);
        this.router.navigate(['/stores']);
        this.getStores();
        this.loading = false;
        this.model = {};
      },
      error => {
        this.error = 'Error on creating a new store.';
        this.loading = false;
      }
    );
  }

  deleteStore(_id: number) {
    this.storesService.delete(_id).subscribe(() => {
      this.getStores();
    });
  }

  private getStores() {
    this.storesService.getStores().subscribe(stores => {
      this.stores = stores;
    });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => {
      this.message = message;
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      let formData: FormData = new FormData();

      formData.append('file', file, file.name);

      let headers = new Headers();

      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });

      this.model.store_file = file.name;
      this.model.store_path = '../../assets/images/store/';

      this.http
        .post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(data => console.log('success'), error => console.log(error));
    }
  }

  ngOnInit() {
    this.getStores();
    this.getUserInfo();
  }
}
