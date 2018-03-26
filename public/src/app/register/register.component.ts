import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/auth/index';
import { Header } from '../commons/header/header.component';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

type registerAlias = { logo: string, alt: string, title: string, subtitle: string, date: Date };
export class Register extends Header {

  constructor(logo: string, alt: string, title: string, subtitle: string, date: Date) {
    super(logo, alt, title, subtitle, date);
  }

}

let registerSetUp = new Header('glyphicon glyphicon-user', 'Register', 'Register', 'Fill up the form to get access', new Date());


@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  public model: any = {};
  public loading: boolean = false;
  public error: string = '';
  private apiEndPoint: string = 'api/upload/user/asset';

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private http: Http) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.error = 'Username already exists.';
        this.loading = false;
      });
  }

  fileChange(event) {
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

  // tslint:disable:member-ordering
  public registerSetUp: registerAlias = {
    logo: registerSetUp.getLogo,
    alt: registerSetUp.getAlt,
    title: registerSetUp.getTitle,
    subtitle: registerSetUp.getSubtitle,
    date: registerSetUp.getDate
  };


  ngOnInit() {
  }

}





