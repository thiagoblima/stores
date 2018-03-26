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
import {
  ActivatedRoute,
  Params,
  Router,
  NavigationExtras
} from '@angular/router';
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
export class StoreComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  private currentUser: User;
  private loading: boolean = false;
  private model: any = {};
  public users: User[] = [];
  public stores: Store[] = [];
  public user: User;
  public store: Store;
  public data;
  public show: boolean = false;
  public error: string = '';
  public message: string = '';

  constructor(
    private userService: UserService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private http: Http,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getUserInfo();

    this.route.params
      .switchMap(params => this.storesService.getById(params.id))
      .subscribe(store => (this.store = store));

    this.model._id = this.route.snapshot.params['id'];
    this.model.store_image = this.route.snapshot.params['store_image'];
    this.model.store_phone = this.route.snapshot.params['store_phone'];
    this.model.store_country = this.route.snapshot.params['store_country'];
    this.model.store_city = this.route.snapshot.params['store_city'];
    this.model.store_type = this.route.snapshot.params['store_type'];
    this.model.store_address = this.route.snapshot.params['store_address'];
    this.model.updated_at = new Date();
  }

  private updateStore(store: Store) {
    this.loading = true;

    this.storesService.update(this.model).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/stores']);

        this.loadAllUsers();
      },
      error => {
        this.error = 'Error on updating the store.';
        this.loading = false;
      }
    );
  }

  fileChange(event) {
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

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => {
      this.message = message;
    });
  }

  private getStores() {
    this.storesService.getStores().subscribe(data => {
      this.data = data;
    });
  }
}
