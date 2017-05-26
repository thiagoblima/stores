import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/auth/index';
import { Header } from '../commons/header/header.component';

type registerAlias = { logo: string, alt: string, title: string, subtitle: string, date: Date };
export class Register extends Header {

    constructor(logo: string, alt: string, title: string, subtitle: string, date: Date) {
        super(logo, alt, title, subtitle, date);
    }

}

let registerSetUp = new Header('glyphicon glyphicon-user','Register','Register','Fill up the form to get access', new Date());


@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public model: any = {};
  public loading: boolean = false;
  public error: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

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

  public registerSetUp: registerAlias = {
        logo: registerSetUp.getLogo,
        alt: registerSetUp.getAlt,
        title: registerSetUp.getTitle,
        subtitle: registerSetUp.getSubtitle,
        date: registerSetUp.getDate
    }


  ngOnInit() { 
  }

}





