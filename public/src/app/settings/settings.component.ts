import { Component, NgModule, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { UserService } from '../services/auth/index';

interface UserConfig<T, X, Y, Z> {
  users: Array<{}>;
  getCurrentUser(): Object;
  getMessage(): string;
  getShow(): boolean;
}
@Component({
  moduleId: module.id,
  selector: 'app-settings',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ backgroundColor: 'transparent', color: '#F4F2F4', opacity: 1 }),
        animate('800ms')
      ]),
      transition(':leave', [style({ opacity: 0 }), animate('800ms')])
    ])
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements UserConfig<User, User[], string, boolean>, OnInit {

  private currentUser;
  private message;
  private show;
  public users;

  constructor(private userService: UserService, private router: Router) {
    this.getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  deleteUser(_id: number): {} {
    return this.userService.delete(_id).subscribe(() => {
      this.loadAllUsers();
    });
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

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getShow(): boolean {
    return this.show;
  }

  public getMessage(): string {
    return this.message;
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getUserInfo();
  }

}
