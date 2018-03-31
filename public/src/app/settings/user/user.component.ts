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

export class UserComponent implements OnInit {

  // tslint:disable:no-inferrable-types
  private currentUser: User;
  private error: string = '';
  private model: any = {};
  private loading: boolean = false;
  public users: User[] = [];
  public user: User;
  public message: string = '';
  public show: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private alertService: AlertService,
    private http: Http
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
      this.message = message;
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
      error => {
        this.error = 'Error on saving the user.';
        this.loading = false;
      }
    );
  }

  private fileChange(event): void {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      let formData: FormData = new FormData();

      formData.append('file', file, file.name);

      let headers = new Headers();
      let options = new RequestOptions({ headers: headers });

      this.model.file = file.name;
      this.model.path = './assets/images/user/';

      this.userService.fileChange(formData, options).subscribe(
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

  ngOnInit(): void {
    this.loadAllUsers();
    this.getUserInfo();
    this.getUserById();
    this.queryRouteParameters();
  }
}
