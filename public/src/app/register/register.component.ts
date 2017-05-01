import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/auth/index';

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


  ngOnInit() {
  }

}





