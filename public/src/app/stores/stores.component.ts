import { Component, NgModule, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/index';
import { Stores } from '../models/index';
import { UserService } from '../services/auth/index';
import { StoresService } from '../services/stores/index';

@Component({
  moduleId: module.id,
  selector: 'app-stores',
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
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})

export class StoresComponent implements OnInit {

  private currentUser: User;
  private stores: Stores[] = [];
  private message: string = '';

  constructor(private router: Router, private storesService: StoresService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  deleteStore(_id: number) {
    this.storesService.delete(_id).subscribe(() => { this.getStores() });
  }

  private getStores() {
    this.storesService.getStores().subscribe(stores => { this.stores = stores; });
  }

  private getUserInfo() {
    this.userService.getUserInfo().subscribe(message => { this.message = message; })
  }

  ngOnInit() {

    this.getStores();
    this.getUserInfo();

  }


}
