import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from '../../commons/nav/nav.component';
import { HeaderComponent } from '../../commons/header/header.component';
import { FooterComponent } from '../../commons/footer/footer.component';
import { StoresComponent } from '../../stores/stores.component';
import { User } from '../../models/index';
import { UserService } from '../../services/auth/index';
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
  

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getUserInfo();
    this.route.params
      .switchMap((params) => this.userService.getById( params.id ))
      .subscribe(user => this.user = user);
  }

   private updateUser(user: User) {
    this.userService.update(user._id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => { this.message = message; })
  }

}
