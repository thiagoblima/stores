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
import { UserService, AlertService } from '../../services/auth/index';
import 'rxjs/add/operator/switchMap';

interface UserConfig<T, X, Y, Z> {
  users: Array<{}>;
  model: Object;
  error: string;
  loading: string;
  getCurrentUser(): Object;
  getMessage(): string;
  getShow(): boolean;
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
  selector: 'app-user',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements UserConfig<User, User[], string, boolean>, OnInit {

  private currentUser;
  private message;
  private show;
  public model: any = {};
  public loading;
  public users;
  public user;
  public error;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private alertService: AlertService,
    private http: Http
  ) {
    this.getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private getUserById(): {} {
    return this.route.params
      .switchMap(params => this.userService.getById(params.id))
      .subscribe(user => (this.user = user));
  }

  private loadAllUsers(): {} {
    return this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private getUserInfo(): {} {
    return this.userService.getUserInfo().subscribe(message => {
      this.getMessage = message;
    });
  }

  private updateUser(user: User): void {
    this.loading = true;

    this.fileChangeChecker();

    this.userService.update(this.model).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/settings']);
        this.loadAllUsers();
      },
      err => {
        let serverError: ErrorConfig<boolean, string, { string, number }> = JSON.parse(err._body);
        this.error = 'An error occured: ' + `${serverError.err.name}`
        this.loading = false;
        console.warn('Update user debug: ', serverError);
      }
    );
  }

  private fileChange(event): void {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      let formData: FormData = new FormData();

      formData.append('file', file, file.name);

      this.model.file = file.name;
      this.model.path = './assets/images/user/';

      this.userService.fileChange(formData).subscribe(
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
    if (!this.model.file) {
      this.getUserById();
      this.model.file = this.user.file;
      this.model.path = './assets/images/user/';
    }
  }

  private queryRouteParameters(): void {
    this.model._id = this.route.snapshot.params['id'];
    this.model.email = this.route.snapshot.params['email'];
    this.model.file = this.route.snapshot.params['file'];
    this.model.path = this.route.snapshot.params['path'];
    this.model.firstname = this.route.snapshot.params['firstname'];
    this.model.lastname = this.route.snapshot.params['lastname'];
    this.model.age = this.route.snapshot.params['age'];
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

  ngOnInit(): void {
    this.loadAllUsers();
    this.getUserInfo();
    this.getUserById();
    this.queryRouteParameters();
  }
}
