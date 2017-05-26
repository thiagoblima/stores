import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { UserService } from '../services/auth/index';

@Component({
  moduleId: module.id,
  selector: 'app-settings',
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
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  private currentUser: User;
  public users: User[] = [];
  public show: boolean = false;
  public message: string = '';


  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getUserInfo();
  }

  deleteUser(_id: number) {
    this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => { this.message = message; })
  }

}
