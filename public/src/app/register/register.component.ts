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

  model: any = {};
  loading = false;
  error = '';

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
        this.error = 'Authentication failed: wrong user or password.';
        this.loading = false;
      });
  }


  ngOnInit() {
  }

}





