import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from '../../commons/nav/nav.component';
import { HeaderComponent } from '../../commons/header/header.component';
import { FooterComponent } from '../../commons/footer/footer.component';
import { StoresComponent } from '../../stores/stores.component';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/auth/index';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
            animate('800ms')
          ]
        ),
        transition(
          ':leave', [
            style({ opacity: 0 }),
            animate('800ms')
          ]
        )
      ]
    )
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private currentUser: User;
  private users: User[] = [];
  private user: User;
  private message: string = '';
  private error: string = '';
  public model: any = {};
  public loading: boolean = false;


  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    this.loadAllUsers();
    this.getUserInfo();
    this.route.params
      .switchMap((params) => this.userService.getById(params.id))
      .subscribe(user => this.user = user);
  }

  private updateUser(user: User) {
    this.loading = true;
    this.route.params
      .switchMap((params) => this.userService.update(params._id));

    this.userService.update(this.model).subscribe(data => {
      this.alertService.success('Registration successful', true);
      this.router.navigate(['/settings']);
      this.loadAllUsers();
    },
      error => {
        this.error = 'Error on saving the user.';
        this.loading = false;
      });

  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => { this.message = message; })
  }

}
